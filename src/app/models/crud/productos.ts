import { Categoria } from "./categoria";

export interface IProductCard {
  urlImage: string;
  descripcion: string;
  categoria: Categoria;
}

export interface Producto {
  id?: number;
  estado?: string;
  descripcion: string;
  categoriaId: number;
  formula?: string;
  imagen: string;
  swModelo: boolean;
  categoria?: Categoria;
  parametros: number[];
}
