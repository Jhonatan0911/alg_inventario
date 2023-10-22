import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-especificaciones',
  templateUrl: './modal-especificaciones.component.html',
  styleUrls: ['./modal-especificaciones.component.css']
})
export class ModalEspecificacionesComponent implements OnInit {

  loading: boolean = false;
  parametros: any[] = [
    {
      "descripcion": "ANCHO",
      "prefijo": null,
      "swIsEtiqueta": false,
      "id": 5,
      "type": "number",
      "estado": "Activo"
    },
    {
      "descripcion": "DIAMETRO",
      "prefijo": null,
      "swIsEtiqueta": false,
      "id": 5,
      "type": "number",
      "estado": "Activo"
    },
    {
      "descripcion": "ALTO",
      "prefijo": null,
      "swIsEtiqueta": false,
      "id": 5,
      "type": "number",
      "estado": "Activo"
    },
    {
      "descripcion": "LARGO",
      "prefijo": null,
      "swIsEtiqueta": false,
      "id": 5,
      "type": "number",
      "estado": "Activo"
    },
    {
      "descripcion": "CLASE",
      "prefijo": null,
      "swIsEtiqueta": false,
      "id": 5,
      "type": "number",
      "estado": "Activo"
    },
    {
      "descripcion": "MATERIAL",
      "prefijo": null,
      "swIsEtiqueta": false,
      "id": 5,
      "type": "string",
      "estado": "Activo"
    },
    {
      "descripcion": "ESPESOR",
      "prefijo": null,
      "swIsEtiqueta": false,
      "id": 5,
      "type": "number",
      "estado": "Activo"
    },
    {
      "descripcion": "UNION",
      "prefijo": null,
      "swIsEtiqueta": false,
      "id": 5,
      "type": "number",
      "estado": "Activo"
    },
    {
      "descripcion": "CANTIDAD",
      "prefijo": null,
      "swIsEtiqueta": false,
      "id": 5,
      "type": "number",
      "estado": "Activo"
    },
    {
      "descripcion": "PRECIO",
      "prefijo": null,
      "swIsEtiqueta": false,
      "id": 5,
      "type": "number",
      "estado": "Activo"
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalEspecificacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTransfer: any,
    private MainService: MainService
  ) { }

  ngOnInit(): void {
    console.log(this.dataTransfer)
    // this.cargaParametros();
  }

  onClose(type: Boolean): void {
    this.dialogRef.close(type);
  }

  cargaParametros(){
    this.loading = true;
    this.MainService.ParametrizacionService.obtenerParametrosByProducto(this.dataTransfer.producto.id).subscribe({
      next: (req:any) => {
        this.parametros = req.data;
      },
      error: (err: any) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: err,
        })
        this.loading = false
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  submit(){
    this.dialogRef.close(this.parametros);
  }

}
