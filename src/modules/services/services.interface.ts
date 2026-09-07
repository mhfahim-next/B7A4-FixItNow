export interface IService {
  name: string;
  description: string;
  price: number;
  // userId: string;
  categoryId: string;
}

export interface IServiceUpdate {
  title?: string;
  description?: string;
  price?: number;
  technicianId?: string;
  categoryId?: string;

}