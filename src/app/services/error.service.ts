import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ErrorService {

  constructor() { }

   /**
   * It checks if the form control has an error, and if it does, it returns a string with the error
   * message
   * @param {FormGroup} form - FormGroup: The form that contains the input to be validated.
   * @param {string} nameInput - string: The name of the input field.
   * @returns A string with the errors of the input.
   */
    checkInput(form: FormGroup, nameInput: string) {
      return (
        (form.controls[nameInput].errors?.['required']
          ? ' El campo es requerido |'
          : '') +
        (form.controls[nameInput].errors?.['maxlength']
          ? ' Se ha superado el max de caracteres permitidos |'
          : '') +
        (form.controls[nameInput].errors?.['minlength']
          ? ' Muy pocos caracteres |'
          : '') +
        (form.controls[nameInput].errors?.['email']
          ? ' No cumple con los requisitos de un correo valido |'
          : '') +
        (form.controls[nameInput].errors?.['pattern']
          ? ' El campo contiene caracteres no permitidos '
          : '')
      );
    }

    checkInputAnidado(form: any, formAninado: string, nameInput: string) {
      return (
        (form.controls[formAninado].controls[nameInput].errors?.['required']
          ? ' El campo es requerido |'
          : '') +
        (form.controls[formAninado].controls[nameInput].errors?.['maxlength']
          ? ' Se ha superado el max de caracteres permitidos |'
          : '') +
        (form.controls[formAninado].controls[nameInput].errors?.['minlength']
          ? ' Muy pocos caracteres |'
          : '') +
        (form.controls[formAninado].controls[nameInput].errors?.['email']
          ? ' No cumple con los requisitos de un correo valido |'
          : '') +
        (form.controls[formAninado].controls[nameInput].errors?.['pattern']
          ? ' El campo contiene caracteres no permitidos '
          : '')
      );
    }

    /**
     * It returns true if the input is invalid and has been touched
     * @param {FormGroup} form - FormGroup - the form that we want to validate
     * @param {string} nameInput - The name of the input field you want to validate.
     * @returns A boolean value.
     */
    validateInput(form: FormGroup, nameInput: string) {
      return !form.controls[nameInput].valid;
    }


    validateInputAnidado(form: any, formAninado: string, nameInput: string) {
      return !form.controls[formAninado].controls[nameInput].valid;
    }
}
