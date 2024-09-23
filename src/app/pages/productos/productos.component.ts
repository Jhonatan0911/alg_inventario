import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalMiniFormulaComponent } from 'src/app/components/modal-mini-formula/modal-mini-formula.component';
import { ModalModelosComponent } from 'src/app/components/modal-productos/modal-modelos/modal-modelos.component';
import { ModalProductosComponent } from 'src/app/components/modal-productos/modal-productos.component';
import { IProductCard } from 'src/app/models/crud/productos';
import { ObtenerListadoProductosResult } from 'src/app/models/productos/producto';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  loading: boolean = false;

  ref: DynamicDialogRef | undefined;

  products: ObtenerListadoProductosResult[] = [];

  estadosSelect: any[] = [
    {value:"ACT", descripcion: "Activo"},
    {value:"INA", descripcion: "Desactivo"}
  ]

  form = new FormGroup({
    estado: new FormControl('ACT', [Validators.required]),
    filtro: new FormControl(''),
  })


  constructor(
    private MainService: MainService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.cargaProductos();
  }

  ver(event: any, element: any){
    if(event){
      alert(element);
    }
  }


  formula(event?: any, data?: any){
    this.ref = this.dialogService.open(ModalMiniFormulaComponent, {
      header: "Formula",
      width: '40vw',
      data: {
        producto: data,
      }
    });

    this.ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.reload();
      }
    })

  }

  openModal(event?: any, data?: any){
    let editMode = data ? true : false;

    this.ref = this.dialogService.open(ModalProductosComponent, {
      header: editMode ? "Editar producto" : "Crear producto",
      width: '40vw',
      data: {
        producto: data,
        editMode: editMode,
        label: editMode ? "Editar" : "Crear",
      }
    });

    this.ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.reload();
      }
    })
  }

  openModalModelos(event?: any, data?: any){

    this.ref = this.dialogService.open(ModalModelosComponent, {
      header:"Modelos - " + data.descripcion,
      width: '60vw',
      data: {
        producto: data,
      }
    });

    this.ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.reload();
      }
    })
  }

  cargaProductos(event?: any){

    let inputValue: string = "";

    if(event){
      inputValue = event.target.value;
    }
    if ((event && inputValue.length >= 3) || !event) {
      this.loading = true;
      this.MainService.ProductosService.getAll(this.form.value.estado, this.form.value.filtro).subscribe({
        next: (req) => {
          if(req.isSuccess){
            this.products = req.data;
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
  }

  reload(){
    this.cargaProductos();
  }


  eliminar(event: any, element: any) {
    this.loading = true;
    this.MainService.ProductosService.delete(element.id).subscribe({
      next: (req:any) => {
        if(req.isSuccess){
        }
      },
      error: (err: any) => {
        console.log(err)
        this.loading = false
      },
      complete: () => {
        this.loading = false
        this.reload();
      }
    })

  }


}
