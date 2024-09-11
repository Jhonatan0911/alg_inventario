import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { Departamento, Estados, TipoDocumento, municipio } from 'src/app/models/parametrizacion/parametrizacion';
import { Response } from 'src/app/models/response/response';
import { Cliente } from 'src/app/models/crud/cliente';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.component.html',
  styleUrls: ['./modal-clientes.component.css']
})
export class ModalClientesComponent implements OnInit {

  comboTipoDocumento: TipoDocumento[] = [];
  comboEstados: Estados[] = [];
  comboDepartamento: Departamento[] = [];
  comboMunicipio: municipio[] = [];

  isLoading: Boolean = false;

  form = new FormGroup({
    tipoDocumento: new FormControl('', [Validators.required]),
    documento: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    empresa: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    departamento: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required]),
  })

  dataTransfer:any;

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
    console.log(this.dataTransfer)
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
    }else{}
  }

  get(){
    this.MainService.ClientesService.get(this.dataTransfer.cliente.id).subscribe({
      next: (req:any) => {
        this.form.disable();
        this.form.patchValue({
          tipoDocumento: req.tipoDocumento,
          documento: req.documento,
          nombre: req.nombre,
          empresa: req.empresa,
          direccion: req.direccion,
          telefono: req.telefono,
          correo: req.correo,
          departamento: req.departamento,
          municipio: req.municipio,
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

      let object: Cliente = {
        tipoDocumento: this.form.value.tipoDocumento,
        documento: this.form.value.documento,
        nombre: this.form.value.nombre,
        empresa: this.form.value.empresa,
        direccion: this.form.value.direccion,
        telefono: this.form.value.telefono,
        correo: this.form.value.correo,
        departamento: this.form.value.departamento,
        municipio: this.form.value.municipio,
      }

      this.MainService.ClientesService.create(object).subscribe({
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

      let object: Cliente = {
        id: this.dataTransfer.cliente.id,
        tipoDocumento: this.form.value.tipoDocumento,
        documento: this.form.value.documento,
        nombre: this.form.value.nombre,
        empresa: this.form.value.empresa,
        direccion: this.form.value.direccion,
        telefono: this.form.value.telefono,
        correo: this.form.value.correo,
        departamento: this.form.value.departamento,
        municipio: this.form.value.municipio,
      }

      this.MainService.ClientesService.edit(object).subscribe({
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
