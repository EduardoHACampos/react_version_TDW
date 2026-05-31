export type UserRole = "ADMIN" | "LEADER" | "DEVELOPER";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type PublicationType =
  | "ANNOUNCEMENT"
  | "PATCH_NOTE"
  | "DEV_LOG"
  | "LIVESTREAM";

export interface PublicationAuthor {
  id: number;
  name: string;
  role: UserRole;
}

export interface PublicationImage {
  id: number;
  fileUrl: string;
  fileName: string;
  mimeType: string;
  size: number;
  order: number;
  createdAt: string;
}

export interface Publication {
  id: number;
  title: string;
  summary: string;
  content: string;
  slug: string;
  type: PublicationType;
  author: PublicationAuthor;
  images: PublicationImage[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedPublicationsResponse {
  data: Publication[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown;
}

export interface ProductContract {
  id: number;
  name: string;
  price: number;
  category: "MTX" | "Expansion" | "SupportPack";
  imageUrl: string;
}

export interface NewsContract {
  id: number;
  title: string;
  category: "PatchNotes" | "Announcements" | "DevLogs";
  content: string;
  publishedAt: Date;
}
