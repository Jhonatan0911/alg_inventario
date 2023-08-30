import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';
import { Response } from 'src/app/models/response/response';
import { Categoria } from 'src/app/models/crud/categoria';

@Component({
  selector: 'app-modal-categorias',
  templateUrl: './modal-categorias.component.html',
  styleUrls: ['./modal-categorias.component.css']
})
export class ModalCategoriasComponent implements OnInit {

  isLoading: Boolean = false;

  form = new FormGroup({
    descripcion: new FormControl('', [Validators.required]),
  })

  constructor(
    private MainService: MainService,
    public dialogRef: MatDialogRef<ModalCategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTransfer: any
  ) { }

  ngOnInit(): void {
    if(this.dataTransfer.editMode) {
      this.get();
    }
  }

  get(){
    this.MainService.CategoriasService.get(this.dataTransfer.categoria.id).subscribe({
      next: (req:any) => {
        this.form.disable();
        this.form.patchValue({
          descripcion: req.descripcion
        });
        this.form.enable();
      },
      error: (err: any) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Ha ocurrido un error',
        })
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  onClose(type: Boolean): void {
    this.dialogRef.close(type);
  }

  crear(){
    if(this.form.valid){
      this.isLoading = true;

      let object: Categoria = {
        descripcion: this.form.value.descripcion,
      }

      this.MainService.CategoriasService.create(object).subscribe({
        next: (req:any) => {
          if(req.isSuccess){
            Swal.fire({
              icon: 'success',
              title: 'Editado!',
              text: 'Se ha guardado correctamente',
            }).then((result) => {
              if (result.isConfirmed) {
                this.onClose(true);
              }
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: 'Ha ocurrido un error',
            })
          }
        },
        error: (err: any) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ha ocurrido un error',
          })
          this.isLoading = false
        },
        complete: () => {
          this.isLoading = false
        }
      })
    }
  }

  editar(){
    if(this.form.valid){
      this.isLoading = true;

      let object: Categoria = {
        id: this.dataTransfer.categoria.id,
        descripcion: this.form.value.descripcion,
      }

      this.MainService.CategoriasService.edit(object).subscribe({
        next: (req:any) => {

          if(req.isSuccess){
            Swal.fire({
              icon: 'success',
              title: 'Editado!',
              text: 'Se ha editado correctamente',
            }).then((result) => {
              if (result.isConfirmed) {
                this.onClose(true);
              }
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: 'Error al editar',
            })
          }

        },
        error: (err: any) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Error al editar',
          })
          this.isLoading = false
        },
        complete: () => {
          this.isLoading = false
        }
      })
    }

  }

  validate(nameInput: string) {
    return this.MainService.ErrorService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.MainService.ErrorService.checkInput(this.form, nameInput);
  }

}
