import axios from "axios";
import { AUTH_STORAGE_KEYS } from "../constants/auth";

type FieldErrors = Record<string, string>;

interface ApiClientErrorOptions {
  status?: number;
  fieldErrors?: FieldErrors;
}

interface NormalizeApiErrorOptions {
  fallbackMessage?: string;
  fieldMap?: Record<string, string>;
  statusMessages?: Record<number, string>;
}

type MutableHeaders = {
  Authorization?: string;
  set?: (name: string, value: string) => void;
  delete?: (name: string) => void;
};

export class ApiClientError extends Error {
  status?: number;
  fieldErrors?: FieldErrors;

  constructor(message: string, options: ApiClientErrorOptions = {}) {
    super(message);
    this.name = "ApiClientError";
    this.status = options.status;
    this.fieldErrors = options.fieldErrors;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

const DEFAULT_API_BASE_URL = "https://tdwbackend1-production.up.railway.app";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

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

const extractFieldErrors = (
  payload: unknown,
  fieldMap: Record<string, string> = {},
): FieldErrors => {
  const candidate =
    isObject(payload) && isObject(payload.message) ? payload.message : payload;

  if (!isObject(candidate)) {
    return {};
  }

  return Object.entries(candidate).reduce<FieldErrors>((acc, [field, value]) => {
    const message = getMessageString(value);
    const mappedField = fieldMap[field] ?? field;

    if (
      message &&
      mappedField !== "message" &&
      mappedField !== "error" &&
      mappedField !== "statusCode"
    ) {
      acc[mappedField] = message;
    }

    return acc;
  }, {});
};

const resolveApiBaseUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  return (configuredBaseUrl || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
};

const applyAuthorizationHeader = (
  headers: MutableHeaders | undefined,
  token: string | null,
) => {
  if (!headers) {
    return;
  }

  if (token) {
    if (typeof headers.set === "function") {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      headers.Authorization = `Bearer ${token}`;
    }
    return;
  }

  if (typeof headers.delete === "function") {
    headers.delete("Authorization");
  } else {
    delete headers.Authorization;
  }
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
    const backendMessage =
      status && status >= 500 ? undefined : extractApiMessage(error.response?.data);
    const statusMessage =
      typeof status === "number" ? options.statusMessages?.[status] : undefined;

    return new ApiClientError(
      statusMessage ??
        backendMessage ??
        firstFieldError ??
        options.fallbackMessage ??
        "Something went wrong. Please try again.",
      { status, fieldErrors },
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
  baseURL: resolveApiBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token =
    typeof window === "undefined"
      ? null
      : localStorage.getItem(AUTH_STORAGE_KEYS.token)?.trim() || null;

  config.headers = config.headers ?? {};
  applyAuthorizationHeader(config.headers as MutableHeaders, token);

  return config;
});

export default httpClient;
