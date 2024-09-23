export interface RegistrosCRM {
  id?: number;
  nombre: string;
  tipodocumento: number;
  documento: string;
  correo: string;
  telefono: string;
  direccion: string;
  observacion: string;
}


export interface SeguimientoCRM {
  id?: number;
  clienteId: number;
  usuarioCreacionId: number;
  fecha: any;
  descripcion: string;
}


export interface ObtenerListadoClientesCRMRequest {
  start?: string
  end?: string
  estado?: number
  filtro?: string
}


export interface FinalizacionSeguimientoCRMRequest{
  estado: string,
  clienteId: number,
  usuarioCreacionId: number,
  fecha: string,
  descripcion: string
}
