import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { Proveedor } from 'src/app/models/crud/proveedor';

@Component({
  selector: 'app-modal-proveedores',
  templateUrl: './modal-proveedores.component.html',
  styleUrls: ['./modal-proveedores.component.css']
})
export class ModalProveedoresComponent implements OnInit {

  isLoading: Boolean = false;

  form = new FormGroup({
    nit: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    encargado: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required]),
    rubros: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required])
  })

  constructor(
    private MainService: MainService,
    public dialogRef: MatDialogRef<ModalProveedoresComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTransfer: any
  ) { }

  ngOnInit(): void {
    if(this.dataTransfer.editMode) {
      this.get();
    }
  }

  get(){
    this.MainService.ProovedoresService.get(this.dataTransfer.proveedor.id).subscribe({
      next: (req:any) => {
        this.form.disable();
        this.form.patchValue({
          nit: req.nit,
          nombre: req.nombre,
          encargado: req.encargado,
          telefono: req.telefono,
          correo: req.correo,
          direccion: req.direccion,
          departamento: req.departamento,
          municipio: req.municipio,
          rubros: req.rubros,
          estado: req.estado,
        });
        this.form.enable();
      },
      error: (err: any) => {
        console.log(err)
        new Noty({
          type: 'error',
          text: 'Ha ocurrido un error',
        }).show();
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

      let object: Proveedor = {
        nit: this.form.value.nit,
        nombre: this.form.value.nombre,
        encargado: this.form.value.encargado,
        telefono: this.form.value.telefono,
        correo: this.form.value.correo,
        direccion: this.form.value.direccion,
        departamento: this.form.value.departamento,
        municipio: this.form.value.municipio,
        rubros: this.form.value.rubros,
        estado: this.form.value.estado,
      }

      this.MainService.ProovedoresService.create(object).subscribe({
        next: (req:any) => {
          new Noty({
            type: 'success',
            text: 'Se ha guardado correctamente',
            timeout: 3000,
            callbacks: {
              onClose: () => {
                this.onClose(true);
              }
            }
          }).show();
        },
        error: (err: any) => {
          console.log(err)
          new Noty({
            type: 'error',
            text: 'Ha ocurrido un error',
          }).show();
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

      let object: Proveedor = {
        nit: this.form.value.nit,
        nombre: this.form.value.nombre,
        encargado: this.form.value.encargado,
        telefono: this.form.value.telefono,
        correo: this.form.value.correo,
        direccion: this.form.value.direccion,
        departamento: this.form.value.departamento,
        municipio: this.form.value.municipio,
        rubros: this.form.value.rubros,
        estado: this.form.value.estado,
      }

      object.id = this.dataTransfer.especialidad.id
      this.MainService.ProovedoresService.edit(object).subscribe({
        next: (req:any) => {
          new Noty({
            type: 'success',
            text: 'Se ha guardado correctamente',
            timeout: 3000,
            callbacks: {
              onClose: () => {
                this.onClose(true);
              }
            }
          }).show();
        },
        error: (err: any) => {
          console.log(err)
          new Noty({
            type: 'error',
            text: 'Ha ocurrido un error',
          }).show();
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
