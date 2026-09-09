export interface ICategory {  
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ICategoryCreate {
    name: string;
    description: string;
  }
  
  export interface ICategoryUpdate {
    name?: string;
    description?: string;
  }