import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalClientesComponent } from 'src/app/components/modal-clientes/modal-clientes.component';
import { ModalMiniFormulaComponent } from 'src/app/components/modal-mini-formula/modal-mini-formula.component';
import { ModalEspecificacionesComponent } from 'src/app/components/modal-productos/modal-especificaciones/modal-especificaciones.component';
import { IProductCard } from 'src/app/models/crud/productos';
import { factura } from 'src/app/models/factura/factura';
import { Departamento, municipio } from 'src/app/models/parametrizacion/parametrizacion';
import { Response } from 'src/app/models/response/response';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  comboDepartamento: Departamento[] = [];
  comboMunicipio: municipio[] = [];

  loading: boolean = false;
  clientes: any = [];
  products: IProductCard[] = [];
  categorias: any = [];
  tipo: any = [
    'Productos',
    'Servicios',
  ];
  cliente: any;
  clienteSelect: any;
  categoriaSelect: any;
  productosSelect: any = [];


  form = new FormGroup({
    clienteId: new FormControl<number>(0, [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    codDepartamento: new FormControl<number>(0,[Validators.required]),
    codMunicipio: new FormControl<number>(0, [Validators.required]),
    facturaDetalles: new FormControl<any>( [Validators.required]),
  })


  constructor(
    private MainService: MainService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargaClientes();
    this.cargaCategorias();
    this.cargaDepartamentos();
  }

  cargaDepartamentos(){
    this.loading = true;
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
        this.loading = false
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  cargaMunicipio(){
    if(this.form.controls['codDepartamento'].valid){
      this.loading = true;
      this.MainService.ParametrizacionService.municipioByDepartamento(this.form.value.codDepartamento).subscribe({
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
          this.loading = false
        },
        complete: () => {
          this.loading = false
        }
      })
    }else{}
  }

  openModalCliente(){
    const dialogRef = this.dialog.open(ModalClientesComponent, {
      disableClose: true,
      width: '60%',
      position: {top:'2%'},
      data: {
        cliente: this.cliente,
        editMode: true,
        label: "Editar",
      }
    });

    dialogRef.afterClosed().subscribe((response:any) => {
      if(response || response != null && response != false){
        this.cargaCliente();
      }
    });
  }

  agregar(event: any, producto: any){
    const dialogRef = this.dialog.open(ModalEspecificacionesComponent, {
      disableClose: true,
      width: '60%',
      height: '90%',
      position: {top:'2%'},
      data: {
        producto: producto,
      }
    });

    dialogRef.afterClosed().subscribe((response:any) => {
      if(response || response != null && response != false){
        console.log(response);
        this.productosSelect = response;
        this.form.controls['facturaDetalles'].setValue(
          {
            ancho: this.productosSelect.find((a:any) => a.descripcion == 'ANCHO')?.value,
            cantidad: this.productosSelect.find((a:any) => a.descripcion == 'CANTIDAD')?.value,
            clase:  this.productosSelect.find((a:any) => a.descripcion == 'CLASE')?.value,
            diametro: 152.40,
            espesor:  this.productosSelect.find((a:any) => a.descripcion == 'ESPESOR')?.value,
            material:  this.productosSelect.find((a:any) => a.descripcion == 'MATERIAL')?.value,
            precio: 7100
          }
        )
        console.log(this.productosSelect);
        console.log(this.form.value);
      }
    });
  }


  cargaCliente(){
    console.log(this.clienteSelect);
    this.form.controls['clienteId'].setValue(this.clienteSelect);
    if(this.clienteSelect != null || this.clienteSelect != undefined){
      this.loading = true;
      this.MainService.ClientesService.get(this.clienteSelect).subscribe({
        next: (req:any) => {
          this.cliente = req
          this.form.controls['direccion'].setValue(this.cliente.direccion);
        },
        error: (err: any) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: err,
          })
          this.loading = false
        },
        complete: () => {
          this.loading = false
        }
      })
    }
  }

  cargaCategorias(){
    this.loading = true;
    this.MainService.CategoriasService.getAll().subscribe({
      next: (req:any) => {
        this.categorias = req.data
      },
      error: (err: any) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: err,
        })
        this.loading = false
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  cargaProductos(){
    if(this.categoriaSelect != undefined && this.categoriaSelect != null){
      this.loading = true;
      this.MainService.ProductosService.getByCategoria(this.categoriaSelect).subscribe({
        next: (req:any) => {
          this.products = req;
        },
        error: (err: any) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: err,
          })
          this.loading = false
        },
        complete: () => {
          this.loading = false
        }
      })
    }
  }

  cargaClientes(){
    this.loading = true;
    this.MainService.ClientesService.getAll().subscribe({
      next: (req:any) => {
        this.clientes =req.data;
      },
      error: (err: any) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: err,
        })
        this.loading = false
      },
      complete: () => {
        this.loading = false
      }
    })
  }


  submit(){
    if(this.form.valid){
      this.loading = true;

      let factura: factura ={
        clienteId: this.form.value.clienteId,
        direccion: this.form.value.direccion,
        codDepartamento: this.form.value.codDepartamento,
        codMunicipio: this.form.value.codMunicipio,
        descripcion: this.form.value.descripcion,
        facturaDetalles: [this.form.value.facturaDetalles]
      }

      this.MainService.FacturaService.GenerarFactura(factura).subscribe({
        next: (req:any) => {
          console.log(req);
          if(req.isSuccess){
            Swal.fire({
              icon: 'success',
              title: 'Exito!',
              text: 'Factura generada exitosamente',
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: req.mensaje,
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
          this.loading = false
        },
        complete: () => {
          this.loading = false
        }
      })
    }
  }

}
