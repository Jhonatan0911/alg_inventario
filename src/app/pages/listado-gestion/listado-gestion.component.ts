import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalNotasComponent } from 'src/app/components/modal-notas/modal-notas.component';
import { ModalNuevoRegistroCrmComponent } from 'src/app/components/modal-nuevo-registro-crm/modal-nuevo-registro-crm.component';
import { RegistrosCRM } from 'src/app/models/crm/registros';
import { EstadosCRM } from 'src/app/models/parametrizacion/parametrizacion';
import { Column } from 'src/app/models/table';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-listado-gestion',
  templateUrl: './listado-gestion.component.html',
  styleUrls: ['./listado-gestion.component.css']
})
export class ListadoGestionComponent implements OnInit {

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
      field: 'nombre',
      header: 'Nombre',
      width: '180px',
      visible: true,
    },
    {
      field: 'documento',
      header: 'Documento',
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
      field: 'telefono',
      header: 'Telefono',
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
      field: 'seguimientos',
      header: 'Seguimientos',
      width: '180px',
      visible: true,
    }
  ];

  registros!: RegistrosCRM[];

  firstPaginator: number = 0;
  rowTablePaginator: number = 10;
  actualPage: number = 0;
  dataTotalRecords: number = 0;
  dataTotalPages!: number;

  constructor(
    private MainService: MainService,
    private dialogService: DialogService,
  ) { }

  estadosSelect?: EstadosCRM[];

  form = new FormGroup({
    filtro: new FormControl(''),
    estado: new FormControl(''),
    rango_fecha: new FormControl<Date[] | null>(null),
  })

  ngOnInit(): void {
    this.getEstados();
    this.getRegistros();
  }

  getEstados(){
    this.loading = true;
    this.MainService.CrmService.getEstados().subscribe({
      next: (res) => {
        this.estadosSelect = res.data;
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

  getRegistros(event?: any){

    let inputValue: string = "";

    if(event){
      inputValue = event.target.value;
    }

    if ((event && inputValue.length >= 3) || !event) {
      this.loading = true;

      let estado;
      let start: Date;
      let end: Date;
      let filtro;

      if(this.form.value.estado){
        estado = this.form.value.estado
      }

      if(this.form.value.rango_fecha){
        start = this.form.value.rango_fecha[0]
        end = this.form.value.rango_fecha[1]
      }

      if(event && inputValue.length >= 3){
        filtro = inputValue
      }

      this.MainService.CrmService.getAll(estado,start!,end!,filtro).subscribe({
        next: (res) => {
          this.registros = res.data;
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

  openModal(){
    this.ref = this.dialogService.open(ModalNuevoRegistroCrmComponent, {
      header: "Nuevo registro",
      width: '40vw',
    });

    this.ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.reload();
      }
    });
  }

  openModalSeguimientos(registro: RegistrosCRM){
    this.ref = this.dialogService.open(ModalNotasComponent, {
      header: "Seguimientos",
      width: '40vw',
      data: registro
    });

    this.ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.reload();
      }
    });
  }


  reload(){
    this.getRegistros();
  }

}
