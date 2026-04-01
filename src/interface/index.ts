/* Generic API Response Wrapper
   Wrapper genérico para respostas da API 
*/
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
}

/* Shop Contract
   Contrato para o sistema de Loja 
*/
export interface ProductContract {
  id: number;
  name: string;
  price: number;
  category: 'MTX' | 'Expansion' | 'SupportPack';
  imageUrl: string;
}

/* News Contract
   Contrato para o sistema de Notícias 
*/
export interface NewsContract {
  id: number;
  title: string;
  category: 'PatchNotes' | 'Announcements' | 'DevLogs';
  content: string;
  publishedAt: Date;
}