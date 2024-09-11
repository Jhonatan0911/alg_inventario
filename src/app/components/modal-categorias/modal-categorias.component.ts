import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { Categoria } from 'src/app/models/crud/categoria';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

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
  dataTransfer: any;

  constructor(
    private MainService: MainService,
    public dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.dataTransfer = this.config.data;
  }

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
            this.onClose(true);
          }else{
          }
        },
        error: (err: any) => {
          console.log(err)
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

            this.onClose(true);

          }else{

          }

        },
        error: (err: any) => {
          console.log(err)

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
