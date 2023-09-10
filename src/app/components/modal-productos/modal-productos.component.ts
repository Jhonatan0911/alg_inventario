import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';
import { Response } from 'src/app/models/response/response';


@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.css']
})
export class ModalProductosComponent implements OnInit {

  isLoading: Boolean = false;
  archivos: any = [];
  categorias: any = [];

  parametros: any = [];

  parametroValor: string  = "";
  formula: string  = "";

  teclado: any = ["CE","C","%","÷","7","8","9","x","4","5","6","-","1","2","3","+","(",0,")","."];

  form = new FormGroup({
    imagen: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    codigo: new FormControl('', [Validators.required]),
  })

  constructor(
    private MainService: MainService,
    public dialogRef: MatDialogRef<ModalProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTransfer: any
  ) { }

  ngOnInit(): void {
    this.cargaCategorias()
  }

  cargaCategorias(){
    this.isLoading = true;
    this.MainService.CategoriasService.getAll().subscribe({
      next: (req:any) => {
        this.categorias = req.data
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


  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      Array.from(event.target.files).forEach((file:any) => {
        if(this.archivos.length <= 0){
          this.archivos.push(file)
        }else{
          Swal.fire({
            icon: 'warning',
            title: 'Ha sobrepasado el limite de archivos',
            text: 'Se selecciono el primer archivo cargado.',
          })
        }
      });
    }
  }

  add(): void {
    if(this.parametroValor != null && this.parametroValor != undefined && this.parametroValor != "") {
      this.parametros.push({
        parametro: this.parametroValor
      })
      this.parametroValor = "";
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor llene el campo parametro.',
      })
    }
  }


  addFormula(item:any){
    this.formula = this.formula + item
  }

  deleteParametro(t: any): void {
    const index = this.parametros.indexOf(t);
    if (index >= 0) {
      this.parametros.splice(index, 1);
    }
  }

  remove(t: any): void {
    const index = this.archivos.indexOf(t);
    if (index >= 0) {
      this.archivos.splice(index, 1);
    }
  }


  validate(nameInput: string) {
    return this.MainService.ErrorService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.MainService.ErrorService.checkInput(this.form, nameInput);
  }

}
