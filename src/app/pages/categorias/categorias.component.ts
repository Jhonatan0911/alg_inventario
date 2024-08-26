import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MainService } from 'src/app/services/main.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModalCategoriasComponent } from 'src/app/components/modal-categorias/modal-categorias.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'descripcion', 'estado', 'act', 'del'];
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
    this.getCategorias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getCategorias(event?: any){

    let inputValue: string = "";

    if(event){
      inputValue = event.target.value;
    }

    if ((event && inputValue.length >= 3) || !event) {
      this.loading = true;

      this.MainService.CategoriasService.getAll(this.form.value.estado, this.form.value.filtro).subscribe({
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
    const dialogRef = this.dialog.open(ModalCategoriasComponent, {
      disableClose: true,
      width: '60%',
      position: {top:'2%'},
      data: {
        categoria: data,
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
    this.getCategorias();
  }

  eliminar(element: any) {
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrala!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.MainService.CategoriasService.delete(element.id).subscribe({
          next: (req:any) => {
            if(req.success){
              Swal.fire({
                icon: 'success',
                title: 'Eliminada Exitosamente',
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
