export interface factura {
  clienteId: number | null | undefined,
  direccion: string | null | undefined,
  codDepartamento: number | null | undefined,
  codMunicipio: number | null | undefined,
  descripcion: string | null | undefined,
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
