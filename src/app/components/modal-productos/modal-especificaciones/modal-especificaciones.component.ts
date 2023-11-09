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
  parametros: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalEspecificacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTransfer: any,
    private MainService: MainService
  ) { }

  ngOnInit(): void {
    console.log(this.dataTransfer)
    this.cargaParametros();
  }

  onClose(type: Boolean): void {
    this.dialogRef.close(type);
  }

  cargaParametros(){
    this.loading = true;
    this.MainService.ProductosService.get(this.dataTransfer.producto.id).subscribe({
      next: (req:any) => {
        this.parametros = req.parametros;
      },
      error: (err: any) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Ha ocurrido un error',
        })
        this.loading = false
      },
      complete: () => {
        this.loading = false
      }
    })
  }


  submit(){
    this.dataTransfer.producto.parametros = this.parametros;
    this.dialogRef.close(this.dataTransfer.producto);
  }

}
