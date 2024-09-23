import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InsertarModelosRequest } from 'src/app/models/modelo/modelos';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-new-modelo',
  templateUrl: './new-modelo.component.html',
  styleUrls: ['./new-modelo.component.css']
})
export class NewModeloComponent {

  isLoading: boolean = false;

  form = new FormGroup({
    codigoModelo: new FormControl<string | null>(null),
    pcM_Capacidad: new FormControl<number | null>(null),
    tamano: new FormControl<string | null>(null),
    rpm: new FormControl<number | null>(null),
    hp: new FormControl<number | null>(null),
    fases: new FormControl<number | null>(null),
    transmi: new FormControl<string | null>(null),
    clase: new FormControl<string | null>(null),
    amp_220: new FormControl<number | null>(null),
    db: new FormControl<string | null>(null),
    peso:  new FormControl<number | null>(null),
    precioVenta: new FormControl<number | null>(null)
  })

  dataTransfer: any;

  constructor(
    private MainService: MainService,
    public dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.dataTransfer =this.config.data;
  }


  onClose(type: Boolean): void {
    this.dialogRef.close(type);
  }

  crear(){
    if(this.form.valid){
      this.isLoading = true;

      let object: InsertarModelosRequest = {
        codigoModelo: this.form.value.codigoModelo ?? null,
        pcM_Capacidad: this.form.value.pcM_Capacidad ?? null,
        tamano: this.form.value.tamano ?? null,
        rpm: this.form.value.rpm ?? null,
        hp: this.form.value.hp ?? null,
        fases: this.form.value.fases ?? null,
        transmi: this.form.value.transmi ?? null,
        clase: this.form.value.clase ?? null,
        amp_220:this.form.value.amp_220 ?? null,
        db: this.form.value.db ?? null,
        peso: this.form.value.peso ?? null,
        precioVenta: this.form.value.precioVenta ?? null,
        usuarioCreacion: "1",
        producto_id: this.dataTransfer.producto.id
      }

      this.MainService.modelosService.insertarModelos(object).subscribe({
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
