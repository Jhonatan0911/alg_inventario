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
  fecha: Date;
  descripcion: string;
}
