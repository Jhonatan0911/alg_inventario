import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { ModalProveedoresComponent } from 'src/app/components/modal-proveedores/modal-proveedores.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Column } from 'src/app/models/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

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
      field: 'nit',
      header: 'NIT',
      width: '180px',
      visible: true,
    },
    {
      field: 'nombre',
      header: 'Nombre',
      width: '180px',
      visible: true,
    },
    {
      field: 'encargado',
      header: 'Encargado',
      width: '180px',
      visible: true,
    },
    {
      field: 'telefono',
      header: 'Teléfono',
      width: '180px',
      visible: true,
    },
    {
      field: 'correo',
      header: 'Correo',
      width: '180px',
      visible: true,
    },
    {
      field: 'direccion',
      header: 'Dirección',
      width: '180px',
      visible: true,
    },
    {
      field: 'departamento',
      header: 'Departamento',
      width: '180px',
      visible: true,
    },
    {
      field: 'municipio',
      header: 'Municipio',
      width: '180px',
      visible: true,
    },
    {
      field: 'rubros',
      header: 'Rubros',
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

  proveedores!: any[];

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
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.cargaProovedores();
  }

  cargaProovedores(event?: any){

    let inputValue: string = "";

    if(event){
      inputValue = event.target.value;
    }

    if ((event && inputValue.length >= 3) || !event) {
      this.loading = true;
      this.MainService.ProovedoresService.getAll(this.form.value.estado, this.form.value.filtro).subscribe({
        next: (res:any) => {
          this.proveedores = res.data;
          // this.dataTotalRecords = res.data.totalRecords;
          // this.dataTotalPages = res.data.totalPages;
        },
        error: (err: any) => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error cargando información', icon: 'ri-close-circle-line text-2xl' });
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

    this.ref = this.dialogService.open(ModalProveedoresComponent, {
      header: editMode ? "Editar proveedor" : "Crear proveedor",
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
    })
  }

  reload(){
    this.cargaProovedores();
  }


  eliminar(element: any) {
    this.loading = true;
    this.MainService.ProovedoresService.delete(element.id).subscribe({
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
