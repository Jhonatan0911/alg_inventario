import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalClientesComponent } from 'src/app/components/modal-clientes/modal-clientes.component';
import { ModalMiniFormulaComponent } from 'src/app/components/modal-mini-formula/modal-mini-formula.component';
import { ModalEspecificacionesComponent } from 'src/app/components/modal-productos/modal-especificaciones/modal-especificaciones.component';
import { IProductCard } from 'src/app/models/crud/productos';
import { FacturaDetalleProducto, factura } from 'src/app/models/factura/factura';
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

  displayedColumns: string[] = ['descripcion', 'cantidad', 'del'];
  dataSource = new MatTableDataSource();


  form = new FormGroup({
    clienteId: new FormControl<number>(0, [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    codDepartamento: new FormControl<number | null>(null,[Validators.required]),
    codMunicipio: new FormControl<number | null>(null, [Validators.required]),
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

  eliminar(data: any){

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

        let facturaDetalles : FacturaDetalleProducto = {
          idProducto: response.id,
          clase: response.parametros.find((a:any) => a.descripcion == 'CLASE')?.value,
          precio: response.parametros.find((a:any) => a.descripcion == 'PRECIO')?.value,
          cantidad: response.parametros.find((a:any) => a.descripcion == 'CANTIDAD')?.value,
          diametro: response.parametros.find((a:any) => a.descripcion == 'DIAMETRO')?.value,
          material: response.parametros.find((a:any) => a.descripcion == 'MATERIAL')?.value,
          espesor: response.parametros.find((a:any) => a.descripcion == 'ESPESOR')?.value,
          ancho: response.parametros.find((a:any) => a.descripcion == 'ANCHO')?.value,
          diametro_A: response.parametros.find((a:any) => a.descripcion == 'DIAMETRO_A')?.value,
          diametro_B: response.parametros.find((a:any) => a.descripcion == 'DIAMETRO_B')?.value,
          alto: response.parametros.find((a:any) => a.descripcion == 'ALTO')?.value,
          union: response.parametros.find((a:any) => a.descripcion == 'UNION')?.value,
          cierre: response.parametros.find((a:any) => a.descripcion == 'CIERRE')?.value
        }


        this.productosSelect.push(response);

        this.form.controls['facturaDetalles'].setValue(this.form.controls['facturaDetalles'].value.push(facturaDetalles))

        this.dataSource = new MatTableDataSource(this.productosSelect);
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
    if(this.form.valid && this.productosSelect.length >= 1){
      this.loading = true;

      let factura: factura ={
        clienteId: this.form.value.clienteId,
        direccion: this.form.value.direccion,
        codDepartamento: this.form.value.codDepartamento,
        codMunicipio: this.form.value.codMunicipio,
        descripcion: this.form.value.descripcion,
        tipo: 'FACTURA',
        facturaDetalles: this.form.value.facturaDetalles
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
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Error...',
        text: 'Por favor llena todos los campos y asegurate de tener al menos un producto seleccionado',
      })
    }
  }

}
