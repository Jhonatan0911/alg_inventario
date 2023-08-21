import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MainService } from 'src/app/services/main.service';
import { ModalProveedoresComponent } from 'src/app/components/modal-proveedores/modal-proveedores.component';
import { MatDialog } from '@angular/material/dialog';
import * as Noty from 'noty';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nit', 'nombre', 'encargado', 'telefono', 'correo', 'direccion', 'departamento', 'municipio', 'rubros', 'estado', 'act', 'del'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  loading: boolean = false;

  constructor(
    private MainService: MainService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargaProovedores();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargaProovedores(){
    this.loading = true;
    this.MainService.ProovedoresService.getAll().subscribe({
      next: (req:any) => {

        this.dataSource = new MatTableDataSource(req.data);
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log(err)
        new Noty({
          type: 'error',
          text: 'Ha ocurrido un error',
        }).show();
        this.loading = false
      },
      complete: () => {
        this.loading = false
      }
    })
  }
  openModal(data?: any){
    let editMode = data ? true : false;
    const dialogRef = this.dialog.open(ModalProveedoresComponent, {
      disableClose: true,
      width: '60%',
      position: {top:'2%'},
      data: {
        sede: data,
        editMode: editMode,
        label: editMode ? "Editar" : "Crear",
      }
    });

    dialogRef.afterClosed().subscribe((response:any) => {
      if(response || response != null && response != false){
        this.reload();
      }
    });
  }

  reload(){
    this.cargaProovedores();
  }


  eliminar(element: any) {
    var n = new Noty({
      text: `¿Estás seguro? Se borrará la sede: ${element.descripcion}`,
      buttons: [
        Noty.button('Sí, borrala', 'btn btn-success', () => {
          this.loading = false;

        }, { id: 'button1', 'data-status': 'ok' }),

        Noty.button('NO', 'btn btn-error', () => {
          console.log('button 2 clicked');
          n.close();
        })
      ]
    });
    n.show();
  }



}
