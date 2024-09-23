import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModelosResult } from 'src/app/models/modelo/modelos';
import { Column } from 'src/app/models/table';
import { MainService } from 'src/app/services/main.service';
import { NewModeloComponent } from './new-modelo/new-modelo.component';

@Component({
  selector: 'app-modal-modelos',
  templateUrl: './modal-modelos.component.html',
  styleUrls: ['./modal-modelos.component.css']
})
export class ModalModelosComponent {
  loading: boolean = false;

  modelos: ModelosResult[] = [];

  columnsTable: Column[] = [
    {
      field: 'codigoModelo',
      header: 'Código Modelo',
      width: '180px',
      visible: true,
    },
    {
      field: 'pcmCapacidad',
      header: 'Capacidad PCM',
      width: '180px',
      visible: true,
    },
    {
      field: 'tamaño',
      header: 'Tamaño',
      width: '180px',
      visible: true,
    },
    {
      field: 'rpm',
      header: 'RPM',
      width: '180px',
      visible: true,
    },
    {
      field: 'hp',
      header: 'HP',
      width: '180px',
      visible: true,
    },
    {
      field: 'fases',
      header: 'Fases',
      width: '180px',
      visible: true,
    },
    {
      field: 'transmision',
      header: 'Transmisión',
      width: '180px',
      visible: true,
    },
    {
      field: 'clase',
      header: 'Clase',
      width: '180px',
      visible: true,
    },
    {
      field: 'amp220',
      header: 'AMP 220',
      width: '180px',
      visible: true,
    },
    {
      field: 'db',
      header: 'DB',
      width: '180px',
      visible: true,
    },
    {
      field: 'peso',
      header: 'Peso',
      width: '180px',
      visible: true,
    },
    {
      field: 'precioVenta',
      header: 'Precio Venta',
      width: '180px',
      visible: true,
    },
    {
      field: 'estado',
      header: 'Estado',
      width: '180px',
      visible: true,
    }
  ];

  firstPaginator: number = 0;
  rowTablePaginator: number = 10;
  actualPage: number = 0;
  dataTotalRecords: number = 0;
  dataTotalPages!: number;


  dataTransfer: any;

  ref: DynamicDialogRef | undefined;


  constructor(
    private MainService: MainService,
    public dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private dialogService: DialogService
  ) {
    this.dataTransfer =this.config.data;
  }

  ngOnInit(){
    this.getModelos();
  }

  getModelos(){
    this.loading = true;
    this.MainService.modelosService.getModelosByProducto(this.dataTransfer.producto.id).subscribe({
      next: (res) => {
        if(res.isSuccess){
          this.modelos = res.data.modelos;
        }else{

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

  openModal(){
    this.ref = this.dialogService.open(NewModeloComponent, {
      header:"Crear modelo",
      width: '50vw',
      data: this.dataTransfer
    });

    this.ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.getModelos();
      }
    })
  }
}
