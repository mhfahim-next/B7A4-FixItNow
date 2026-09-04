export interface IService {
  title: string;
  description: string;
  price: number;
  technicianId: string;
  categoryId: string;
}

export interface IServiceUpdate {
  title?: string;
  description?: string;
  price?: number;
  technicianId?: string;
  categoryId?: string;

}