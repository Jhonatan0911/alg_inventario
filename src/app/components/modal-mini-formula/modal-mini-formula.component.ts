import { Component, OnInit, Inject } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-mini-formula',
  templateUrl: './modal-mini-formula.component.html',
  styleUrls: ['./modal-mini-formula.component.css']
})
export class ModalMiniFormulaComponent implements OnInit {

  isLoading: boolean = false;
  formulas: any = [];
  parametros: any = [];

  formula: string  = "";
  teclado: any = ["CE","C","%","÷","7","8","9","x","4","5","6","-","1","2","3","+","(",0,")","."];

  dataTransfer: any;

  constructor(
    private MainService: MainService,
    public dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.dataTransfer =this.config.data;
  }

  ngOnInit(): void {
    this.cargaEtiquetas();
    this.cargaFormulas();
  }

  cargaEtiquetas(){
    this.isLoading = true;
    this.MainService.ParametrizacionService.obtenerParametrosByProducto(this.dataTransfer.data.producto.id).subscribe({
      next: (req:any) => {
        this.parametros = req.data
      },
      error: (err: any) => {
        console.log(err)
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  cargaFormulas(){
    this.isLoading = true;
    this.MainService.ParametrizacionService.formulasExcel().subscribe({
      next: (req:any) => {
        this.formulas = req.data
      },
      error: (err: any) => {
        console.log(err)
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  onClose(type: Boolean): void {
    this.dialogRef.close(type);
  }
  addFormula(item:any){
    this.formula = this.formula + " " + item
  }

}
