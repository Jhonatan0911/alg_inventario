import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Producto } from 'src/app/models/crud/productos';


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
  comboParametros: any = [];

  parametroValor!: string;
  formula: string  = "";

  teclado: any = ["CE","C","%","÷","7","8","9","x","4","5","6","-","1","2","3","+","(",0,")","."];

  form = new FormGroup({
    imagen: new FormControl(''),
    modelo: new FormControl<boolean>(false, [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    categoriaId: new FormControl<number | null>(null,[Validators.required]),
    observacion: new FormControl('', [Validators.required]),
  })

  dataTransfer: any;

  constructor(
    private MainService: MainService,
    public dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.dataTransfer =this.config.data;
  }

  ngOnInit(): void {
    this.cargaCategorias()
    this.cargaParametros()

    if(this.dataTransfer.editMode) {
      this.get();
    }
  }

  get(){
    this.MainService.ProductosService.get(this.dataTransfer.producto.id).subscribe({
      next: (req:any) => {
        this.form.disable();
        this.form.patchValue({
          descripcion: req.descripcion,
          categoriaId: req.categoriaId,
          imagen: req.imagen,
          observacion: "Observacion de prueba"
        });
        this.form.enable();

        this.parametros = req.parametros;
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

  cargaCategorias(){
    this.isLoading = true;
    this.MainService.CategoriasService.getAll().subscribe({
      next: (req:any) => {
        this.categorias = req.data
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

  cargaParametros(){
    this.isLoading = true;
    this.MainService.ParametrizacionService.parametrizacionProductos().subscribe({
      next: (req:any) => {
        this.comboParametros = req.data
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


  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      Array.from(event.target.files).forEach((file:any) => {
        if(this.archivos.length <= 0){
          this.archivos.push(file)
        }else{
        }
      });
    }
  }

  add(): void {
    if(this.parametroValor != null && this.parametroValor != undefined && this.parametroValor != "") {
      this.parametros.push(this.parametroValor)
      this.parametroValor = "";
    }else{
    }
  }

  crear(){
    if(this.form.valid){
      this.isLoading = true;

      let object: Producto = {
        descripcion: this.form.value.descripcion!,
        categoriaId: this.form.value.categoriaId!,
        imagen: this.form.value.imagen!,
        swModelo: this.form.value.modelo!,
        parametros: this.parametros.map((par:any) => par.id )
      };

      console.log(object)

      this.MainService.ProductosService.create(object).subscribe({
        next: (req:any) => {
          if(req.isSuccess){

            this.onClose(true);

          }else{
          }
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
  }

  editar(){
    if(this.form.valid){
      this.isLoading = true;

      let object: any = null;
      object = this.form.value;

      object.parametros = this.parametros.map((par:any) => par.id );
      object.id = this.dataTransfer.producto.id;
      console.log(object)

      this.MainService.ProductosService.edit(object).subscribe({
        next: (req:any) => {
          if(req.isSuccess){

            this.onClose(true);
          }
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
