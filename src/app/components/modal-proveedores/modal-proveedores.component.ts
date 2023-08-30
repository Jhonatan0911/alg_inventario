import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { Proveedor } from 'src/app/models/crud/proveedor';
import Swal from 'sweetalert2';
import { Departamento, Estados, TipoDocumento, municipio } from 'src/app/models/parametrizacion/parametrizacion';
import { Response } from 'src/app/models/response/response';

@Component({
  selector: 'app-modal-proveedores',
  templateUrl: './modal-proveedores.component.html',
  styleUrls: ['./modal-proveedores.component.css']
})
export class ModalProveedoresComponent implements OnInit {

  comboTipoDocumento: TipoDocumento[] = [];
  comboEstados: Estados[] = [];
  comboDepartamento: Departamento[] = [];
  comboMunicipio: municipio[] = [];

  isLoading: Boolean = false;

  form = new FormGroup({
    nit: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    encargado: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    direccion: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required]),
    rubros: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required, Validators.maxLength(3)])
  })

  constructor(
    private MainService: MainService,
    public dialogRef: MatDialogRef<ModalProveedoresComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTransfer: any
  ) { }

  ngOnInit(): void {
    this.cargaDepartamentos();
    this.cargaEstados();
    this.cargaTiposDocumento();
    if(this.dataTransfer.editMode) {
      this.get();
    }
  }

  cargaTiposDocumento(){
    this.isLoading = true;
    this.MainService.ParametrizacionService.tipoDocumentos().subscribe({
      next: (req:Response<TipoDocumento[]>) => {
        if(req.isSuccess){
          this.comboTipoDocumento = req.data;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ha ocurrido un error cargando los tipos de documento',
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
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  cargaEstados(){
    this.isLoading = true;
    this.MainService.ParametrizacionService.estados().subscribe({
      next: (req:Response<Estados[]>) => {
        if(req.isSuccess){
          this.comboEstados = req.data;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ha ocurrido un error cargando los estados',
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
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  cargaDepartamentos(){
    this.isLoading = true;
    this.MainService.ParametrizacionService.departamento().subscribe({
      next: (req:Response<Departamento[]>) => {
        if(req.isSuccess){
          this.comboDepartamento = req.data;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ha ocurrido un error cargando los departamentos',
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
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  cargaMunicipio(){
    if(this.form.controls['departamento'].valid){
      this.isLoading = true;
      this.MainService.ParametrizacionService.municipioByDepartamento(this.form.value.departamento).subscribe({
        next: (req:Response<municipio[]>) => {
          if(req.isSuccess){
            this.comboMunicipio = req.data;
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: 'Ha ocurrido un error cargando los municipios',
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
          this.isLoading = false
        },
        complete: () => {
          this.isLoading = false
        }
      })
    }else{

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
        this.cargaMunicipio();
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

      let object: Proveedor = {
        id: this.dataTransfer.proveedor.id,
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

      this.MainService.ProovedoresService.edit(object).subscribe({
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
