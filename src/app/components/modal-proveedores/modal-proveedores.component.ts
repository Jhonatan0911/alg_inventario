import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { Proveedor } from 'src/app/models/crud/proveedor';
import { Departamento, Estados, TipoDocumento, municipio } from 'src/app/models/parametrizacion/parametrizacion';
import { Response } from 'src/app/models/response/response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

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

  dataTransfer: any;

  constructor(
    private MainService: MainService,
    public dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.dataTransfer =this.config.data;
  }

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

  cargaEstados(){
    this.isLoading = true;
    this.MainService.ParametrizacionService.estados().subscribe({
      next: (req:Response<Estados[]>) => {
        if(req.isSuccess){
          this.comboEstados = req.data;
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

  cargaDepartamentos(){
    this.isLoading = true;
    this.MainService.ParametrizacionService.departamento().subscribe({
      next: (req:Response<Departamento[]>) => {
        if(req.isSuccess){
          this.comboDepartamento = req.data;
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

  cargaMunicipio(){
    if(this.form.controls['departamento'].valid){
      this.isLoading = true;
      this.MainService.ParametrizacionService.municipioByDepartamento(this.form.value.departamento).subscribe({
        next: (req:Response<municipio[]>) => {
          if(req.isSuccess){
            this.comboMunicipio = req.data;
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

            this.onClose(true);

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
