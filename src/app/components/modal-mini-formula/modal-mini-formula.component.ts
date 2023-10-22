import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';

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

  constructor(
    private MainService: MainService,
    public dialogRef: MatDialogRef<ModalMiniFormulaComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTransfer: any
  ) { }

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
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: err,
        })
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
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: err,
        })
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
