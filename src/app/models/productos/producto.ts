import { Categoria } from "../crud/categoria";

export interface ObtenerListadoProductosResult{
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
