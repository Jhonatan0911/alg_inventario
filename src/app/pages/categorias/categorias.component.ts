import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { ModalCategoriasComponent } from 'src/app/components/modal-categorias/modal-categorias.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Column } from 'src/app/models/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  loading: boolean = false;

  ref: DynamicDialogRef | undefined;

  columnsTable: Column[] = [
    {
      field: 'id',
      header: 'Id',
      width: '180px',
      visible: true,
    },
    {
      field: 'descripcion',
      header: 'Descripción',
      width: '180px',
      visible: true,
    },
    {
      field: 'estado',
      header: 'Estado',
      width: '180px',
      visible: true,
    },
    {
      field: 'act',
      header: 'Editar',
      width: '180px',
      visible: true,
    },
    {
      field: 'del',
      header: 'Eliminar',
      width: '180px',
      visible: true,
    }
  ];

  categorias!: any[];

  firstPaginator: number = 0;
  rowTablePaginator: number = 10;
  actualPage: number = 0;
  dataTotalRecords: number = 0;
  dataTotalPages!: number;

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
    this.getCategorias();
  }

  getCategorias(event?: any){

    let inputValue: string = "";

    if(event){
      inputValue = event.target.value;
    }

    if ((event && inputValue.length >= 3) || !event) {
      this.loading = true;
      this.MainService.CategoriasService.getAll(this.form.value.estado, this.form.value.filtro).subscribe({
        next: (res:any) => {
          this.categorias = res.data;
          // this.dataTotalRecords = res.data.totalRecords;
          // this.dataTotalPages = res.data.totalPages;
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

  openModal(data?: any){
    let editMode = data ? true : false;

    this.ref = this.dialogService.open(ModalCategoriasComponent, {
      header: editMode ? "Editar Categoria" : "Crear categoria",
      width: '40vw',
      data: {
        categoria: data,
        editMode: editMode,
        label: editMode ? "Editar" : "Crear",
      }
    });

    this.ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.reload();
      }
    });
  }


  reload(){
    this.getCategorias();
  }

  eliminar(element: any) {
    this.loading = true;
    this.MainService.CategoriasService.delete(element.id).subscribe({
      next: (req:any) => {
        if(req.success){
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
