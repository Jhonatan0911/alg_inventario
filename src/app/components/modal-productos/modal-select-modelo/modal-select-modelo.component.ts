import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModelosResult, ObtenerListadoModelosbyProductoResult } from 'src/app/models/modelo/modelos';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-modal-select-modelo',
  templateUrl: './modal-select-modelo.component.html',
  styleUrls: ['./modal-select-modelo.component.css']
})
export class ModalSelectModeloComponent {

  loading: boolean = false;
  modelos: ModelosResult[] = [];

  dataTransfer: any;

  selectModel?: ModelosResult;

  cantidad?: number;

  modelosSelected: {producto: any, modelo: ModelosResult, cantidad: number}[] = [];

  constructor(
    public dialogRef: DynamicDialogRef,
    private MainService: MainService,
    private config: DynamicDialogConfig,
  ) {
    this.dataTransfer = this.config.data;
  }

  ngOnInit(): void {
    console.log(this.dataTransfer)
    this.cargaModelos();
  }

  cargaModelos(){
    this.loading = true;
    this.MainService.modelosService.getModelosByProducto(this.dataTransfer.producto.id).subscribe({
      next: (req) => {
        if(req.isSuccess){
          this.modelos = req.data.modelos;
        }
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

  add(){
    if(this.selectModel != null && this.cantidad! >= 1){
      this.modelosSelected.push({
        producto: this.dataTransfer.producto,
        modelo: this.selectModel,
        cantidad: this.cantidad!
      })

      this.selectModel = undefined;
      this.cantidad = undefined
    }
  }

  deleteModelo(t: any): void {
    const index = this.modelosSelected.indexOf(t);
    if (index >= 0) {
      this.modelosSelected.splice(index, 1);
    }
  }

  send(){
    this.dialogRef.close(this.modelosSelected);
  }
}
