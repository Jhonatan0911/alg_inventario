import { Component, OnInit, Inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-modal-especificaciones',
  templateUrl: './modal-especificaciones.component.html',
  styleUrls: ['./modal-especificaciones.component.css']
})
export class ModalEspecificacionesComponent implements OnInit {

  loading: boolean = false;
  parametros: any[] = [];

  dataTransfer: any;

  constructor(
    public dialogRef: DynamicDialogRef,
    private MainService: MainService,
    private config: DynamicDialogConfig,
  ) {
    this.dataTransfer =this.config.data;
  }

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
