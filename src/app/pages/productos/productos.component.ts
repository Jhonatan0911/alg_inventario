import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalMiniFormulaComponent } from 'src/app/components/modal-mini-formula/modal-mini-formula.component';
import { ModalProductosComponent } from 'src/app/components/modal-productos/modal-productos.component';
import { IProductCard } from 'src/app/models/crud/productos';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  loading: boolean = false;

  products: IProductCard[] = [];

  constructor(
    private MainService: MainService,
    private dialog: MatDialog
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
    const dialogRef = this.dialog.open(ModalMiniFormulaComponent, {
      disableClose: true,
      width: '60%',
      height: '90%',
      position: {top:'2%'},
      data: {
        producto: data,
      }
    });

    dialogRef.afterClosed().subscribe((response:any) => {
      if(response || response != null && response != false){
        this.reload();
      }
    });

  }

  openModal(event?: any, data?: any){

    let editMode = data ? true : false;
    const dialogRef = this.dialog.open(ModalProductosComponent, {
      disableClose: true,
      width: '60%',
      height: '90%',
      position: {top:'2%'},
      data: {
        producto: data,
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

  cargaProductos(){
    this.loading = true;
    this.MainService.ProductosService.getAll().subscribe({
      next: (req:any) => {
        this.products = req.data;
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

  reload(){
    this.cargaProductos();
  }


  eliminar(event: any, element: any) {
    if(event){
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
          this.MainService.ProductosService.delete(element.id).subscribe({
            next: (req:any) => {
              if(req.isSuccess){
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


}
