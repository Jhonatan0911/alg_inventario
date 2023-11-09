export interface factura {
  clienteId: number | null | undefined,
  direccion: string | null | undefined,
  codDepartamento: number | null | undefined,
  codMunicipio: number | null | undefined,
  descripcion: string | null | undefined,
  tipo: string;
  facturaDetalles: [
    {
      clase: number,
      precio: number,
      cantidad: number,
      diametro: number,
      material: string,
      espesor: number,
      ancho: number,
    }
  ]
}

export interface FacturaDetalleProducto {
  idProducto: number,
  clase: number,
  precio: number,
  cantidad: number,
  diametro: number,
  material: string,
  espesor: number,
  ancho: number,
  diametro_A: number,
  diametro_B: number,
  alto: number,
  union: string,
  cierre: string
}
