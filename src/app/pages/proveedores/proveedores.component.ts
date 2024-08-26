import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MainService } from 'src/app/services/main.service';
import { ModalProveedoresComponent } from 'src/app/components/modal-proveedores/modal-proveedores.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  form = new FormGroup({
    estado: new FormControl('ACT', [Validators.required]),
    filtro: new FormControl(''),
  })


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

  cargaProovedores(event?: any){

    let inputValue: string = "";

    if(event){
      inputValue = event.target.value;
    }
    if ((event && inputValue.length >= 3) || !event) {
      this.loading = true;
      this.MainService.ProovedoresService.getAll(this.form.value.estado, this.form.value.filtro).subscribe({
        next: (req:any) => {

          this.dataSource = new MatTableDataSource(req.data);
          this.dataSource.paginator = this.paginator;
        },
        error: (err: any) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: err,
          })
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
    const dialogRef = this.dialog.open(ModalProveedoresComponent, {
      disableClose: true,
      width: '60%',
      height: '90%',
      position: {top:'2%'},
      data: {
        proveedor: data,
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

    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.MainService.ProovedoresService.delete(element.id).subscribe({
          next: (req:any) => {
            if(req.success){
              Swal.fire({
                icon: 'success',
                title: 'Eliminado Exitosamente',
              })
            }
          },
          error: (err: any) => {
            console.log(err)
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: err,
            })
            this.loading = false
          },
          complete: () => {
            this.loading = false
            this.reload();
          }
        })
      }
    })
  }



}
