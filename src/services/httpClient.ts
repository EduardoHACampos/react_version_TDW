import axios, { AxiosHeaders } from "axios";
import { getStoredToken, clearStoredAuth, emitUnauthorized } from "../utils/authSession";

type FieldErrors = Record<string, string>;

interface ApiClientErrorOptions {
  status?: number;
  fieldErrors?: FieldErrors;
  requestId?: string | null;
}

interface NormalizeApiErrorOptions {
  fallbackMessage?: string;
  fieldMap?: Record<string, string>;
  statusMessages?: Record<number, string>;
}

export class ApiClientError extends Error {
  status?: number;
  fieldErrors?: FieldErrors;
  requestId?: string | null;

  constructor(message: string, options: ApiClientErrorOptions = {}) {
    super(message);
    this.name = "ApiClientError";
    this.status = options.status;
    this.fieldErrors = options.fieldErrors;
    this.requestId = options.requestId ?? null;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const formatApiErrorForDisplay = (
  error: unknown,
  fallbackMessage: string,
  options: { includeRequestId?: boolean } = {},
) => {
  if (error instanceof ApiClientError) {
    if (options.includeRequestId && error.requestId) {
      return `${error.message} Support code: ${error.requestId}`;
    }

    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};

const DEFAULT_DEVELOPMENT_API_BASE_URL = "http://localhost:3001";
const DEFAULT_PRODUCTION_API_BASE_URL =
  "https://tdwbackend1-production.up.railway.app";
const LOCALHOST_BASE_URL_PATTERN = /^https?:\/\/(?:localhost|127(?:\.\d{1,3}){3})(?::\d+)?$/i;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const DEFAULT_STATUS_MESSAGES: Record<number, string> = {
  413: "The request is too large. Please reduce the file size and try again.",
  429: "Too many attempts. Please wait a moment and try again.",
};

const getMessageString = (value: unknown): string | undefined => {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value.map(getMessageString).find(Boolean);
  }

  return undefined;
};

const extractApiMessage = (payload: unknown): string | undefined => {
  if (!isObject(payload)) {
    return getMessageString(payload);
  }

  return (
    getMessageString(payload.message) ??
    getMessageString(payload.error) ??
    getMessageString(payload.detail)
  );
};

const extractRequestId = (payload: unknown): string | null => {
  if (!isObject(payload) || typeof payload.requestId !== "string") {
    return null;
  }

  const requestId = payload.requestId.trim();
  return requestId || null;
};

const getHeaderValue = (headers: unknown, headerName: string) => {
  const normalizedHeaderName = headerName.toLowerCase();

  if (headers instanceof AxiosHeaders) {
    const value = headers.get(headerName);
    return typeof value === "string" && value.trim() ? value.trim() : null;
  }

  if (!isObject(headers)) {
    return null;
  }

  const headerEntry = Object.entries(headers).find(
    ([key]) => key.toLowerCase() === normalizedHeaderName,
  );
  const value = headerEntry?.[1];

  if (Array.isArray(value)) {
    return value.map(getMessageString).find(Boolean) ?? null;
  }

  return getMessageString(value) ?? null;
};

const extractFieldErrors = (
  payload: unknown,
  fieldMap: Record<string, string> = {},
): FieldErrors => {
  if (isObject(payload) && Array.isArray(payload.errors)) {
    return payload.errors.reduce<FieldErrors>((acc, issue) => {
      if (!isObject(issue)) {
        return acc;
      }

      const field =
        typeof issue.field === "string" && issue.field.trim()
          ? issue.field.trim()
          : null;
      const message = getMessageString(issue.message);

      if (!field || !message) {
        return acc;
      }

      acc[fieldMap[field] ?? field] = message;
      return acc;
    }, {});
  }

  if (isObject(payload) && isObject(payload.errors)) {
    return Object.entries(payload.errors).reduce<FieldErrors>(
      (acc, [field, value]) => {
        const message = getMessageString(value);

        if (message) {
          acc[fieldMap[field] ?? field] = message;
        }

        return acc;
      },
      {},
    );
  }

  return {};
};

const resolveApiBaseUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (configuredBaseUrl) {
    if (import.meta.env.PROD && LOCALHOST_BASE_URL_PATTERN.test(configuredBaseUrl)) {
      return DEFAULT_PRODUCTION_API_BASE_URL.replace(/\/+$/, "");
    }

    return configuredBaseUrl.replace(/\/+$/, "");
  }

  return (
    import.meta.env.DEV
      ? DEFAULT_DEVELOPMENT_API_BASE_URL
      : DEFAULT_PRODUCTION_API_BASE_URL
  ).replace(/\/+$/, "");
};

const setHeader = (
  headers: AxiosHeaders,
  name: string,
  value: string,
) => {
  headers.set(name, value);
};

const removeHeader = (headers: AxiosHeaders, name: string) => {
  headers.delete(name);
};

const shouldHandleUnauthorized = (requestUrl?: string) =>
  !requestUrl?.includes("/auth/login");

export const API_BASE_URL = resolveApiBaseUrl();

export const resolveApiUrl = (path: string) => {
  if (!path) {
    return API_BASE_URL;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const normalizeApiError = (
  error: unknown,
  options: NormalizeApiErrorOptions = {},
) => {
  if (error instanceof ApiClientError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const fieldErrors = extractFieldErrors(error.response?.data, options.fieldMap);
    const firstFieldError = Object.values(fieldErrors)[0];
    const requestId =
      extractRequestId(error.response?.data) ??
      getHeaderValue(error.response?.headers, "x-request-id");
    const backendMessage =
      status && status >= 500 ? undefined : extractApiMessage(error.response?.data);
    const statusMessage =
      typeof status === "number"
        ? options.statusMessages?.[status] ?? DEFAULT_STATUS_MESSAGES[status]
        : undefined;

    return new ApiClientError(
      statusMessage ??
        backendMessage ??
        firstFieldError ??
        options.fallbackMessage ??
        "Something went wrong. Please try again.",
      { status, fieldErrors, requestId },
    );
  }

  if (error instanceof Error && error.message) {
    return new ApiClientError(error.message);
  }

  return new ApiClientError(
    options.fallbackMessage ?? "Something went wrong. Please try again.",
  );
};

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  const headers = AxiosHeaders.from(config.headers);

  if (
    typeof FormData !== "undefined" &&
    config.data instanceof FormData
  ) {
    removeHeader(headers, "Content-Type");
  }

  if (token) {
    setHeader(headers, "Authorization", `Bearer ${token}`);
  } else {
    removeHeader(headers, "Authorization");
  }

  config.headers = headers;
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      shouldHandleUnauthorized(error.config?.url)
    ) {
      clearStoredAuth();
      emitUnauthorized();
    }

    return Promise.reject(error);
  },
);

export default httpClient;
