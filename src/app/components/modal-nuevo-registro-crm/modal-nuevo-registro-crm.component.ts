import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegistrosCRM } from 'src/app/models/crm/registros';
import { TipoDocumento } from 'src/app/models/parametrizacion/parametrizacion';
import { Response } from 'src/app/models/response/response';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-modal-nuevo-registro-crm',
  templateUrl: './modal-nuevo-registro-crm.component.html',
  styleUrls: ['./modal-nuevo-registro-crm.component.css']
})
export class ModalNuevoRegistroCrmComponent {

  isLoading: boolean = false;

  form: FormGroup = new FormGroup({
    tipodocumento: new FormControl('', [Validators.required]),
    documento: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl(''),
    observacion: new FormControl('')
  });

  comboTipoDocumento: TipoDocumento[] = [];

  constructor(
    public dialogRef: DynamicDialogRef,
    private MainService: MainService
  ) {}

  ngOnInit(): void {
    this.cargaTiposDocumento();
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

  crear(){
    if(this.form.valid){
      this.isLoading = true;

      let object: RegistrosCRM = {
        nombre: this.form.value.nombre,
        tipodocumento: this.form.value.tipoDocumento,
        documento: this.form.value.documento,
        correo: this.form.value.correo,
        telefono: this.form.value.telefono,
        direccion: this.form.value.direccion,
        observacion: this.form.value.observacion
      }

      this.MainService.CrmService.create(object).subscribe({
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

  onClose(type: Boolean): void {
    this.dialogRef.close(type);
  }

  validate(nameInput: string) {
    return this.MainService.ErrorService.validateInput(this.form, nameInput);
  }

  check(nameInput: string) {
    return this.MainService.ErrorService.checkInput(this.form, nameInput);
  }

}
