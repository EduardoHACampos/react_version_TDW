import httpClient, { ApiClientError, normalizeApiError } from "./httpClient";
import type { AuthUser, UserRole } from "../interface";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isUserRole = (value: unknown): value is UserRole =>
  value === "ADMIN" || value === "LEADER" || value === "DEVELOPER";

const unwrapPayload = (value: unknown) => {
  if (isObject(value) && isObject(value.data)) {
    return value.data;
  }

  return value;
};

const normalizeAuthUser = (value: unknown): AuthUser | null => {
  if (!isObject(value)) {
    return null;
  }

  const normalizedRole =
    typeof value.role === "string" ? value.role.toUpperCase() : value.role;

  if (
    (typeof value.id !== "string" && typeof value.id !== "number") ||
    typeof value.name !== "string" ||
    typeof value.email !== "string" ||
    !isUserRole(normalizedRole)
  ) {
    return null;
  }

  return {
    id: String(value.id),
    name: value.name.trim(),
    email: value.email.trim(),
    role: normalizedRole,
  };
};

const getTokenFromResponse = (value: unknown): string | null => {
  if (!isObject(value)) {
    return null;
  }

  const tokenCandidates = [value.token, value.access_token, value.accessToken];
  const token = tokenCandidates.find(
    (candidate): candidate is string =>
      typeof candidate === "string" && candidate.trim().length > 0,
  );

  return token?.trim() ?? null;
};

const getUserFromResponse = (value: unknown): AuthUser | null => {
  if (!isObject(value)) {
    return null;
  }

  return (
    normalizeAuthUser(value.user) ??
    normalizeAuthUser(value.profile) ??
    normalizeAuthUser(value.admin) ??
    normalizeAuthUser(value)
  );
};

export interface Job {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
}

const normalizeJobs = (value: unknown): Job[] => {
  const payload = unwrapPayload(value);

  if (Array.isArray(payload)) {
    return payload as Job[];
  }

  if (isObject(payload) && Array.isArray(payload.jobs)) {
    return payload.jobs as Job[];
  }

  return [];
};

export const getJobs = async (): Promise<Job[]> => {
  try {
    const response = await httpClient.get<unknown>("/jobs/");
    return normalizeJobs(response.data);
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage: "Failed to load opportunities. Please try again later.",
      statusMessages: {
        500: "Failed to load opportunities. Please try again later.",
      },
    });
  }
};

export interface ApplyFormData {
  name: string;
  email: string;
  portfolioLink?: string;
  message: string;
  jobName: string;
}

export const applyToJob = async (jobId: number, data: ApplyFormData) => {
  try {
    const payload: Record<string, string> = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      jobName: data.jobName.trim(),
    };

    if (data.portfolioLink?.trim()) {
      payload.portfolioLink = data.portfolioLink.trim();
    }

    const response = await httpClient.post(`/jobs/${jobId}/apply`, payload);
    return response.data;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't send your application right now. Please try again later.",
      statusMessages: {
        404: "This opportunity is no longer available.",
        429: "Too many attempts. Please wait a moment and try again.",
        500: "We couldn't send your application right now. Please try again later.",
      },
    });
  }
};

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  portfolioLink?: string;
}

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const payload: Record<string, string> = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
    };

    if (data.portfolioLink?.trim()) {
      payload.portfolioLink = data.portfolioLink.trim();
    }

    const response = await httpClient.post("/jobs/contact/", payload);
    return response.data;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't send your message right now. Please try again later.",
      statusMessages: {
        429: "Too many attempts. Please wait a moment and try again.",
        500: "We couldn't send your message right now. Please try again later.",
      },
    });
  }
};

export interface HuntFormData {
  name: string;
  email: string;
}

export const submitJoinTheHuntForm = async (data: HuntFormData) => {
  try {
    const response = await httpClient.post("/subscribe", {
      name: data.name.trim(),
      email: data.email.trim(),
    });
    return response.data;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't complete your subscription right now. Please try again later.",
      statusMessages: {
        409: "This email is already registered.",
        429: "Too many attempts. Please wait a moment and try again.",
        500: "We couldn't complete your subscription right now. Please try again later.",
      },
    });
  }
};

interface InternalLoginResponse {
  token: string;
  user: AuthUser;
}

export const loginInternal = async (
  email: string,
  password: string,
): Promise<InternalLoginResponse> => {
  try {
    const response = await httpClient.post("/auth/login", {
      email: email.trim(),
      password,
    });

    const payload = unwrapPayload(response.data);
    const token = getTokenFromResponse(payload);
    const user = getUserFromResponse(payload);

    if (!token || !user) {
      throw new ApiClientError(
        "We couldn't validate the sign-in response. Please contact support.",
      );
    }

    return { token, user };
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't sign you in right now. Please try again later.",
      statusMessages: {
        401: "Invalid credentials.",
        403: "You do not have permission to access this area.",
        429: "Too many sign-in attempts. Please wait a moment and try again.",
        500: "We couldn't sign you in right now. Please try again later.",
      },
    });
  }
};