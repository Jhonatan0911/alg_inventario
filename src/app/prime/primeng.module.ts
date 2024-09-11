import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SkeletonModule } from 'primeng/skeleton';

// Services
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [],
  providers: [ MessageService, DialogService ],
  imports: [
    CommonModule,
    ToastModule,
    TableModule,
    CardModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    MenuModule,
    FileUploadModule,
    RadioButtonModule,
    PasswordModule,
    MultiSelectModule,
    InputTextareaModule,
    SkeletonModule
  ],
  exports:[
    ToastModule,
    TableModule,
    CardModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    MenuModule,
    FileUploadModule,
    RadioButtonModule,
    PasswordModule,
    MultiSelectModule,
    InputTextareaModule,
    SkeletonModule
  ]
})
export class PrimengModule { }
