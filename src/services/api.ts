import httpClient, { ApiClientError, normalizeApiError } from "./httpClient";
import type {
  AuthUser,
  PaginatedPublicationsResponse,
  Publication,
  PublicationImage,
  PublicationType,
  UserRole,
} from "../interface";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isUserRole = (value: unknown): value is UserRole =>
  value === "ADMIN" || value === "LEADER" || value === "DEVELOPER";

const unwrapPayload = <T>(value: T) => {
  if (isObject(value) && "data" in value && isObject(value.data)) {
    return value.data;
  }

  return value;
};

interface PublicMessageResponse {
  message: string;
}

const normalizePublicMessage = (
  value: unknown,
  fallbackMessage: string,
): PublicMessageResponse => {
  const payload = unwrapPayload(value);

  if (isObject(payload) && typeof payload.message === "string" && payload.message.trim()) {
    return {
      message: payload.message.trim(),
    };
  }

  return {
    message: fallbackMessage,
  };
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
    isActive: value.isActive !== false,
    createdAt:
      typeof value.createdAt === "string" ? value.createdAt : undefined,
    updatedAt:
      typeof value.updatedAt === "string" ? value.updatedAt : undefined,
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

const normalizePublicationImage = (value: unknown): PublicationImage | null => {
  if (!isObject(value)) {
    return null;
  }

  if (
    typeof value.id !== "number" ||
    typeof value.fileUrl !== "string" ||
    typeof value.fileName !== "string" ||
    typeof value.mimeType !== "string" ||
    typeof value.size !== "number" ||
    typeof value.order !== "number" ||
    typeof value.createdAt !== "string"
  ) {
    return null;
  }

  return {
    id: value.id,
    fileUrl: value.fileUrl,
    fileName: value.fileName,
    mimeType: value.mimeType,
    size: value.size,
    order: value.order,
    createdAt: value.createdAt,
  };
};

const normalizePublicationAuthor = (
  value: unknown,
): Publication["author"] | null => {
  if (!isObject(value)) {
    return null;
  }

  const normalizedRole =
    typeof value.role === "string" ? value.role.toUpperCase() : value.role;

  if (
    typeof value.id !== "number" ||
    typeof value.name !== "string" ||
    !isUserRole(normalizedRole)
  ) {
    return null;
  }

  return {
    id: value.id,
    name: value.name.trim(),
    role: normalizedRole,
  };
};

const isPublicationType = (value: unknown): value is PublicationType =>
  value === "ANNOUNCEMENT" ||
  value === "PATCH_NOTE" ||
  value === "DEV_LOG" ||
  value === "LIVESTREAM";

const normalizePublication = (value: unknown): Publication | null => {
  if (!isObject(value)) {
    return null;
  }

  const author = normalizePublicationAuthor(value.author);

  if (
    typeof value.id !== "number" ||
    typeof value.title !== "string" ||
    typeof value.summary !== "string" ||
    typeof value.content !== "string" ||
    typeof value.slug !== "string" ||
    !isPublicationType(value.type) ||
    !author ||
    typeof value.createdAt !== "string" ||
    typeof value.updatedAt !== "string"
  ) {
    return null;
  }

  const images = Array.isArray(value.images)
    ? value.images
        .map(normalizePublicationImage)
        .filter((image): image is PublicationImage => Boolean(image))
    : [];

  return {
    id: value.id,
    title: value.title,
    summary: value.summary,
    content: value.content,
    slug: value.slug,
    type: value.type,
    author,
    images,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
  };
};

export interface Job {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
}

export interface ApiHealthReady {
  status: string;
  database: string;
  uptime: number | null;
  startedAt?: string;
  timestamp?: string;
  requestId?: string;
}

const normalizeJob = (value: unknown): Job | null => {
  if (!isObject(value)) {
    return null;
  }

  if (
    typeof value.id !== "number" ||
    typeof value.title !== "string" ||
    typeof value.description !== "string" ||
    typeof value.isActive !== "boolean"
  ) {
    return null;
  }

  return {
    id: value.id,
    title: value.title.trim(),
    description: value.description.trim(),
    isActive: value.isActive,
    createdAt: typeof value.createdAt === "string" ? value.createdAt : undefined,
  };
};

const normalizeJobs = (value: unknown): Job[] => {
  const payload = unwrapPayload(value);

  if (Array.isArray(payload)) {
    return payload
      .map(normalizeJob)
      .filter((job): job is Job => Boolean(job));
  }

  if (isObject(payload) && Array.isArray(payload.jobs)) {
    return payload.jobs
      .map(normalizeJob)
      .filter((job): job is Job => Boolean(job));
  }

  return [];
};

const normalizeHealthReady = (value: unknown): ApiHealthReady => {
  const payload = unwrapPayload(value);

  if (!isObject(payload)) {
    return {
      status: "unknown",
      database: "unknown",
      uptime: null,
    };
  }

  return {
    status:
      typeof payload.status === "string" && payload.status.trim()
        ? payload.status.trim()
        : "unknown",
    database:
      typeof payload.database === "string" && payload.database.trim()
        ? payload.database.trim()
        : "unknown",
    uptime: typeof payload.uptime === "number" ? payload.uptime : null,
    startedAt:
      typeof payload.startedAt === "string" ? payload.startedAt : undefined,
    timestamp:
      typeof payload.timestamp === "string" ? payload.timestamp : undefined,
    requestId:
      typeof payload.requestId === "string" && payload.requestId.trim()
        ? payload.requestId.trim()
        : undefined,
  };
};

export const getApiHealthReady = async () => {
  try {
    const response = await httpClient.get("/health/ready");
    return normalizeHealthReady(response.data);
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage: "We couldn't check the API status right now.",
      statusMessages: {
        404: "The API health endpoint is not available.",
        500: "We couldn't check the API status right now.",
      },
    });
  }
};

export const getJobs = async (): Promise<Job[]> => {
  try {
    const response = await httpClient.get<unknown>("/jobs");
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

export interface CreateJobData {
  title: string;
  description: string;
  isActive: boolean;
}

export const createJob = async (data: CreateJobData) => {
  try {
    const response = await httpClient.post("/jobs", {
      title: data.title.trim(),
      description: data.description.trim(),
      isActive: data.isActive,
    });

    const job = normalizeJob(unwrapPayload(response.data));

    if (!job) {
      throw new ApiClientError(
        "We couldn't validate the created job response. Please try again.",
      );
    }

    return job;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't create this job right now. Please try again later.",
      statusMessages: {
        401: "Authentication required.",
        403: "You do not have permission to manage jobs.",
        409: "A job with this title already exists.",
        500: "We couldn't create this job right now. Please try again later.",
      },
    });
  }
};

export interface UpdateJobData {
  title?: string;
  description?: string;
  isActive?: boolean;
}

const buildJobMutationPayload = (data: UpdateJobData) => {
  const payload: UpdateJobData = {};

  if (typeof data.title === "string") {
    payload.title = data.title.trim();
  }

  if (typeof data.description === "string") {
    payload.description = data.description.trim();
  }

  if (typeof data.isActive === "boolean") {
    payload.isActive = data.isActive;
  }

  return payload;
};

export const updateJob = async (jobId: number, data: UpdateJobData) => {
  try {
    const response = await httpClient.patch(
      `/jobs/${jobId}`,
      buildJobMutationPayload(data),
    );

    const job = normalizeJob(unwrapPayload(response.data));

    if (!job) {
      throw new ApiClientError(
        "We couldn't validate the updated job response. Please try again.",
      );
    }

    return job;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't update this job right now. Please try again later.",
      statusMessages: {
        401: "Authentication required.",
        403: "You do not have permission to manage jobs.",
        404: "Job not found.",
        409: "A job with this title already exists.",
        500: "We couldn't update this job right now. Please try again later.",
      },
    });
  }
};

export const toggleJobStatus = async (jobId: number) => {
  try {
    const response = await httpClient.patch(`/jobs/${jobId}/deactivate`);
    const payload = unwrapPayload(response.data);
    const job = normalizeJob(
      isObject(payload) && "job" in payload ? payload.job : payload,
    );

    if (!job) {
      throw new ApiClientError(
        "We couldn't validate the updated job status response. Please try again.",
      );
    }

    return {
      job,
      message:
        isObject(payload) && typeof payload.message === "string" && payload.message.trim()
          ? payload.message.trim()
          : "Job status updated successfully.",
    };
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't update this job status right now. Please try again later.",
      statusMessages: {
        401: "Authentication required.",
        403: "You do not have permission to manage jobs.",
        404: "Job not found.",
        500: "We couldn't update this job status right now. Please try again later.",
      },
    });
  }
};

export const deleteJobPermanently = async (jobId: number) => {
  try {
    const response = await httpClient.delete(`/jobs/${jobId}/permanent`);

    return normalizePublicMessage(
      response.data,
      "Job deleted successfully",
    );
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't permanently delete this job right now. Please try again later.",
      statusMessages: {
        401: "Authentication required.",
        403: "You do not have permission to manage jobs.",
        404: "Job not found.",
        500: "We couldn't permanently delete this job right now. Please try again later.",
      },
    });
  }
};

export interface ApplyFormData {
  name: string;
  email: string;
  portfolioLink?: string;
  message: string;
  jobName?: string;
}

export const applyToJob = async (jobId: number, data: ApplyFormData) => {
  try {
    const payload: Record<string, string> = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
    };

    if (data.portfolioLink?.trim()) {
      payload.portfolioLink = data.portfolioLink.trim();
    }

    if (data.jobName?.trim()) {
      payload.jobName = data.jobName.trim();
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
  subject: string;
  message: string;
}

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const response = await httpClient.post("/jobs/contact", {
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    });
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
    return normalizePublicMessage(
      response.data,
      "Subscription successful!",
    );
  } catch (error) {
    const normalizedError = normalizeApiError(error, {
      fallbackMessage:
        "We couldn't complete your subscription right now. Please try again later.",
      statusMessages: {
        409: "This email is already subscribed.",
        429: "Too many attempts. Please wait a moment and try again.",
        500: "We couldn't complete your subscription right now. Please try again later.",
      },
    });

    if (normalizedError.status === 409) {
      return {
        message: normalizedError.message,
      };
    }

    throw normalizedError;
  }
};

export interface NewsletterUnsubscribeData {
  email: string;
}

export const unsubscribeFromNewsletter = async (
  data: NewsletterUnsubscribeData,
) => {
  try {
    const response = await httpClient.post("/newsletter/unsubscribe", {
      email: data.email.trim(),
    });

    return normalizePublicMessage(
      response.data,
      "If this email is subscribed, it has been unsubscribed successfully.",
    );
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't process your unsubscribe right now. Please try again later.",
      statusMessages: {
        429: "Too many attempts. Please wait a moment and try again.",
        500: "We couldn't process your unsubscribe right now. Please try again later.",
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
    const user = normalizeAuthUser(
      isObject(payload) && "user" in payload ? payload.user : payload,
    );

    if (!token || !user) {
      throw new ApiClientError(
        "We couldn't validate the sign-in response. Please contact support.",
      );
    }

    if (!user.isActive) {
      throw new ApiClientError("This account is inactive.");
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

export const getCurrentUser = async () => {
  try {
    const response = await httpClient.get("/auth/me");
    const user = normalizeAuthUser(unwrapPayload(response.data));

    if (!user) {
      throw new ApiClientError(
        "We couldn't validate the current session. Please sign in again.",
      );
    }

    if (!user.isActive) {
      throw new ApiClientError("This account is inactive.", { status: 401 });
    }

    return user;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage: "Authentication required.",
      statusMessages: {
        401: "Authentication required.",
      },
    });
  }
};

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export const registerUser = async (data: RegisterUserData) => {
  try {
    const response = await httpClient.post("/auth/register", {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
      role: data.role,
    });

    const user = normalizeAuthUser(unwrapPayload(response.data));

    if (!user) {
      throw new ApiClientError(
        "We couldn't validate the created user response. Please try again.",
      );
    }

    return user;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't create this account right now. Please try again later.",
      statusMessages: {
        403: "You do not have permission to create this account.",
        409: "Email already in use.",
        429: "Too many attempts. Please wait a moment and try again.",
        500: "We couldn't create this account right now. Please try again later.",
      },
    });
  }
};

export interface UpdateCurrentUserData {
  name?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
}

export const updateCurrentUser = async (data: UpdateCurrentUserData) => {
  try {
    const response = await httpClient.patch("/auth/me", data);
    const user = normalizeAuthUser(unwrapPayload(response.data));

    if (!user) {
      throw new ApiClientError(
        "We couldn't validate the updated profile response. Please try again.",
      );
    }

    return user;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't update your profile right now. Please try again later.",
      fieldMap: {
        current_password: "currentPassword",
      },
      statusMessages: {
        401: "Authentication required.",
        400: "Please review the highlighted profile fields.",
        409: "Email already in use.",
        429: "Too many attempts. Please wait a moment and try again.",
        500: "We couldn't update your profile right now. Please try again later.",
      },
    });
  }
};

export interface ListPublicationsParams {
  page: number;
  limit: number;
  type?: PublicationType;
}

const normalizePublicationList = (
  value: unknown,
): PaginatedPublicationsResponse => {
  if (!isObject(value) || !Array.isArray(value.data)) {
    return {
      data: [],
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    };
  }

  return {
    data: value.data
      .map(normalizePublication)
      .filter((publication): publication is Publication => Boolean(publication)),
    page: typeof value.page === "number" ? value.page : 1,
    limit: typeof value.limit === "number" ? value.limit : 10,
    total: typeof value.total === "number" ? value.total : value.data.length,
    totalPages: typeof value.totalPages === "number" ? value.totalPages : 1,
  };
};

export const listPublications = async (params: ListPublicationsParams) => {
  try {
    const response = await httpClient.get("/publications", {
      params,
    });

    return normalizePublicationList(response.data);
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't load publications right now. Please try again later.",
      statusMessages: {
        500: "We couldn't load publications right now. Please try again later.",
      },
    });
  }
};

export const getPublicationById = async (publicationId: number) => {
  try {
    const response = await httpClient.get(`/publications/${publicationId}`);
    const publication = normalizePublication(unwrapPayload(response.data));

    if (!publication) {
      throw new ApiClientError("Publication not found.");
    }

    return publication;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage: "We couldn't load this publication right now.",
      statusMessages: {
        404: "Publication not found.",
        500: "We couldn't load this publication right now.",
      },
    });
  }
};

export const getPublicationBySlug = async (slug: string) => {
  try {
    const response = await httpClient.get(`/publications/slug/${slug}`);
    const publication = normalizePublication(unwrapPayload(response.data));

    if (!publication) {
      throw new ApiClientError("Publication not found.");
    }

    return publication;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage: "We couldn't load this publication right now.",
      statusMessages: {
        404: "Publication not found.",
        500: "We couldn't load this publication right now.",
      },
    });
  }
};

export interface PublicationMutationInput {
  title: string;
  summary: string;
  content: string;
  type: PublicationType;
  images?: File[];
}

const buildPublicationRequestPayload = (data: PublicationMutationInput) => {
  const normalizedFields = {
    title: data.title.trim(),
    summary: data.summary.trim(),
    content: data.content.trim(),
    type: data.type,
  };

  if (!data.images || data.images.length === 0) {
    return normalizedFields;
  }

  const formData = new FormData();
  formData.append("title", normalizedFields.title);
  formData.append("summary", normalizedFields.summary);
  formData.append("content", normalizedFields.content);
  formData.append("type", normalizedFields.type);
  data.images.forEach((image) => {
    formData.append("images", image);
  });

  return formData;
};

export const createPublication = async (data: PublicationMutationInput) => {
  try {
    const response = await httpClient.post(
      "/publications",
      buildPublicationRequestPayload(data),
    );

    const publication = normalizePublication(unwrapPayload(response.data));

    if (!publication) {
      throw new ApiClientError(
        "We couldn't validate the created publication response.",
      );
    }

    return publication;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't create this publication right now. Please try again later.",
      statusMessages: {
        403: "You do not have permission to manage publications.",
        429: "Too many attempts. Please wait a moment and try again.",
        500: "We couldn't create this publication right now. Please try again later.",
      },
    });
  }
};

export const updatePublication = async (
  publicationId: number,
  data: PublicationMutationInput,
) => {
  try {
    const response = await httpClient.patch(
      `/publications/${publicationId}`,
      buildPublicationRequestPayload(data),
    );

    const publication = normalizePublication(unwrapPayload(response.data));

    if (!publication) {
      throw new ApiClientError(
        "We couldn't validate the updated publication response.",
      );
    }

    return publication;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't update this publication right now. Please try again later.",
      statusMessages: {
        403: "You do not have permission to manage publications.",
        404: "Publication not found.",
        429: "Too many attempts. Please wait a moment and try again.",
        500: "We couldn't update this publication right now. Please try again later.",
      },
    });
  }
};

export const deletePublication = async (publicationId: number) => {
  try {
    const response = await httpClient.delete(`/publications/${publicationId}`);
    return response.data;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't delete this publication right now. Please try again later.",
      statusMessages: {
        403: "You do not have permission to manage publications.",
        404: "Publication not found.",
        500: "We couldn't delete this publication right now. Please try again later.",
      },
    });
  }
};

export const deletePublicationImage = async (
  publicationId: number,
  imageId: number,
) => {
  try {
    const response = await httpClient.delete(
      `/publications/${publicationId}/images/${imageId}`,
    );
    return response.data;
  } catch (error) {
    throw normalizeApiError(error, {
      fallbackMessage:
        "We couldn't remove this image right now. Please try again later.",
      statusMessages: {
        403: "You do not have permission to manage publications.",
        404: "Image not found.",
        500: "We couldn't remove this image right now. Please try again later.",
      },
    });
  }
};
