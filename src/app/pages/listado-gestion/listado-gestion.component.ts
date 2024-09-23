import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalNotasComponent } from 'src/app/components/modal-notas/modal-notas.component';
import { ModalNuevoRegistroCrmComponent } from 'src/app/components/modal-nuevo-registro-crm/modal-nuevo-registro-crm.component';
import { FinalizacionSeguimientoCRMRequest, ObtenerListadoClientesCRMRequest, RegistrosCRM } from 'src/app/models/crm/registros';
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
    },
    {
      field: 'finalizar',
      header: 'Finalizar',
      width: '180px',
      visible: true,
    }
  ];

  visibleDialogFinalizar: boolean = false;

  registroFinalizar: {
    id: number |null,
    descripcion: string | null
  } = {
    id: null,
    descripcion: null
  }

  registros!: RegistrosCRM[];

  firstPaginator: number = 0;
  rowTablePaginator: number = 10;
  actualPage: number = 0;
  dataTotalRecords: number = 0;
  dataTotalPages!: number;

  constructor(
    private MainService: MainService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  estadosSelect?: EstadosCRM[];

  form = new FormGroup({
    filtro: new FormControl(''),
    estado: new FormControl<number | null>(null),
    rango_fecha: new FormControl<string[] | null>(null),
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

  finalizarRegistro(){
    this.loading = true;

    if(this.registroFinalizar?.id != null && this.registroFinalizar?.descripcion != null){
      let request: FinalizacionSeguimientoCRMRequest = {
        estado: "Finalizado",
        clienteId: this.registroFinalizar.id!,
        usuarioCreacionId: 1,
        fecha: new Date().toISOString(),
        descripcion: this.registroFinalizar.descripcion!
      }

      this.MainService.CrmService.finalizacionSeguimientoCRM(request).subscribe({
        next: (res) => {
          if(res.isSuccess){
            this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Registro finalizado correctamente' });
            this.registroFinalizar = {
              id: null,
              descripcion: null
            }
            this.visibleDialogFinalizar = false;
            this.getRegistros();
          }else{
            this.messageService.add({ severity: 'error', summary: 'Exito!', detail: res.mensaje });
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
    }else{
      this.messageService.add({ severity: 'warn', summary: 'ALG', detail: 'Digite una observación' });
    }
  }

  getRegistros(event?: any){

    let inputValue: string = "";

    if(event){
      inputValue = event.target.value;
    }

    if ((event && inputValue.length >= 3) || !event) {
      this.loading = true;

      let request: ObtenerListadoClientesCRMRequest = {};

      if(this.form.value.estado){
        request.estado = this.form.value.estado
      }

      if(this.form.value.rango_fecha){
        request.start = this.form.value.rango_fecha[0]
        request.end = this.form.value.rango_fecha[1]
      }

      if(event && inputValue.length >= 3){
        request.filtro = inputValue
      }

      this.MainService.CrmService.getAll(request).subscribe({
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

  openModalFinalizar(registro: RegistrosCRM){
    this.registroFinalizar = {
      id: registro.id!,
      descripcion: null
    }
    this.visibleDialogFinalizar = true;
  }


  reload(){
    this.getRegistros();
  }

}
