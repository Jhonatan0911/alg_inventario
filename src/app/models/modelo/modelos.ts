import { ObtenerListadoProductosResult } from "../productos/producto"

export interface ObtenerListadoModelosbyProductoResult {
  producto: ObtenerListadoProductosResult,
  modelos: ModelosResult[]
}


export interface ModelosResult {
  codigoModelo: string,
  pcmCapacidad: string,
  tamaño: string,
  rpm: string,
  hp: string,
  fases: string,
  transmision: string,
  clase: string,
  amp220: string,
  db: string,
  peso: string,
  precioVenta: string,
  estado: string
}


export interface InsertarModelosRequest {
  codigoModelo: string | null,
  pcM_Capacidad: number | null,
  tamano: string | null,
  rpm: number | null,
  hp: number | null,
  fases: number | null,
  transmi: string | null,
  clase: string | null,
  amp_220: number | null,
  db: string | null,
  peso: number | null,
  precioVenta: number | null,
  usuarioCreacion: string | null,
  producto_id: number | null
}
