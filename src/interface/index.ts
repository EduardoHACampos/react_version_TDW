export type UserRole = "ADMIN" | "LEADER" | "DEVELOPER";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

/* Generic API Response Wrapper
   Wrapper generico para respostas da API
*/
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown;
}

/* Shop Contract
   Contrato para o sistema de Loja
*/
export interface ProductContract {
  id: number;
  name: string;
  price: number;
  category: "MTX" | "Expansion" | "SupportPack";
  imageUrl: string;
}

/* News Contract
   Contrato para o sistema de Noticias
*/
export interface NewsContract {
  id: number;
  title: string;
  category: "PatchNotes" | "Announcements" | "DevLogs";
  content: string;
  publishedAt: Date;
}
