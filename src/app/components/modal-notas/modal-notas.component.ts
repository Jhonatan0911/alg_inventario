import { Component } from '@angular/core';
import { ParametrizacionService } from '../../services/parametrizacion.service';
import { MessageService } from 'primeng/api';
import { MainService } from '../../services/main.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RegistrosCRM, SeguimientoCRM } from 'src/app/models/crm/registros';

interface EventItem {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
  user?: string;
  observacion?: string;
}

@Component({
  selector: 'app-modal-notas',
  templateUrl: './modal-notas.component.html',
  styleUrls: ['./modal-notas.component.css']
})
export class ModalNotasComponent {
  loading: boolean = false;

  events: EventItem[] = [];

  modalAddIsOpen: boolean = false;

  registro!: RegistrosCRM;

  constructor(
    public _mainService: MainService,
    private messageService: MessageService,
    private config: DynamicDialogConfig
  ) {
    this.getNotasByRegistroId();

    this.registro = this.config.data;
    this.events = [];
  }


  getNotasByRegistroId(){
    this.loading = true;
    this._mainService.CrmService.getSeguimientos(this.registro!.id!).subscribe({
      next: (res) => {
        if(res.isSuccess){
          let timelineNotas: EventItem[] = [];
          res.data.forEach(data => {
            timelineNotas.push(
              {
                status: data.id?.toString(),
                date: data.fecha.toDateString(),
                icon: 'pi pi-clock',
                color: '#0E1F60',
                user: data.usuarioCreacionId.toString(),
                observacion: data.descripcion
              }
            )
          });
          this.events = timelineNotas
        }
      },
      error: (err) => {
        this.loading = false;
      },
      complete: ()=>{
        this.loading = false;
      }
    })
  }


  showDialog() {
    this.modalAddIsOpen = true;
  }

  notaSeguimiento?: string;

  addNota(){
    if(this.notaSeguimiento != null && this.notaSeguimiento != undefined && this.notaSeguimiento != ""){

      let nota: SeguimientoCRM = {
        clienteId: this.registro.id!,
        usuarioCreacionId: 1,
        fecha: new Date(),
        descripcion: this.notaSeguimiento
      }

      this._mainService.CrmService.createNotaRegistro(nota).subscribe({
        next: (res) => {
          if(res.isSuccess){
            this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Nota creada correctamente' });
          }
          this.modalAddIsOpen = false;
          this.getNotasByRegistroId();
        },
        error: (err) => {
          this.loading = false
        },
        complete: () => {
          this.loading = false
        }
      })
    }
  }
}
