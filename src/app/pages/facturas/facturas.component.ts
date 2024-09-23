import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalClientesComponent } from 'src/app/components/modal-clientes/modal-clientes.component';
import { ModalEspecificacionesComponent } from 'src/app/components/modal-productos/modal-especificaciones/modal-especificaciones.component';
import { ModalSelectModeloComponent } from 'src/app/components/modal-productos/modal-select-modelo/modal-select-modelo.component';
import { FacturaDetalleProducto, factura } from 'src/app/models/factura/factura';
import { Departamento, municipio } from 'src/app/models/parametrizacion/parametrizacion';
import { ObtenerListadoProductosResult } from 'src/app/models/productos/producto';
import { Response } from 'src/app/models/response/response';
import { Column } from 'src/app/models/table';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  comboDepartamento: Departamento[] = [];
  comboMunicipio: municipio[] = [];

  ref: DynamicDialogRef | undefined;

  loading: boolean = false;
  products: ObtenerListadoProductosResult[] = [];
  categorias: any = [];
  tipo: any = [
    'Productos',
    'Servicios',
  ];

  cliente: any;
  clienteSelect: any;
  categoriaSelect: any;
  tipoSelect: any;
  productosSelect: any = [];
  productosEnviar: any = [];

  firstPaginator: number = 0;
  rowTablePaginator: number = 10;
  actualPage: number = 0;
  dataTotalRecords: number = 0;
  dataTotalPages!: number

  columnsTable: Column[] = [
    {
      field: 'descripcion',
      header: 'Producto',
      width: '180px',
      visible: true,
    },
    {
      field: 'cantidad',
      header: 'Cantidad',
      width: '180px',
      visible: true,
    },
    {
      field: 'precio',
      header: 'Precio unitario',
      width: '180px',
      visible: true,
    },
    {
      field: 'precio',
      header: 'Precio total',
      width: '180px',
      visible: true,
    },
    {
      field: 'del',
      header: 'Eliminar',
      width: '180px',
      visible: true,
    }
  ];


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
    private ruta: ActivatedRoute,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    if(this.ruta.snapshot.params['tipo']){
      this.tipo = this.ruta.snapshot.params['tipo'];
    }

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
        }
      },
      error: (err: any) => {
        console.log(err)
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
          }
        },
        error: (err: any) => {
          console.log(err)
          this.loading = false
        },
        complete: () => {
          this.loading = false
        }
      })
    }else{}
  }

  openModalCliente(){
    this.ref = this.dialogService.open(ModalClientesComponent, {
      header: "Cliente",
      width: '40vw',
      data: {
        cliente: this.cliente,
        editMode: true,
        label: "Editar",
      }
    });

    this.ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.cargaCliente();
      }
    })
  }

  agregar(event: any, producto: ObtenerListadoProductosResult){

    if(producto.swModelo){
      this.ref = this.dialogService.open(ModalSelectModeloComponent, {
        header: "Selecciona un modelo",
        width: '40vw',
        data: {
          producto: producto,
        }
      });

      this.ref.onClose.subscribe((response: any) => {
        if (response) {
          console.log(response);

          response.forEach((item:any) => {

            const precioLimpio = parseFloat(item.modelo.precioVenta.replace(/[.,\s]/g, ''));

            const precioTotal = precioLimpio * item.cantidad;

            let facturaDetalles : FacturaDetalleProducto = {
              idProducto: item.producto.id,
              precio: precioTotal,
              cantidad: item.cantidad,
              modelo: item.modelo.codigoModelo
            }

            let productoSelect = {
              producto: item.producto.descripcion + " " + item.modelo.codigoModelo,
              cantidad: item.cantidad,
              precio: precioLimpio,
              precioTotal: precioTotal
            }

            this.productosEnviar.push(facturaDetalles)

            this.productosSelect.push(productoSelect);
          })

          this.form.controls['facturaDetalles'].setValue(this.productosEnviar)
          console.log(this.productosSelect);
          console.log(this.form.value);

        }
      })

    }else{
      this.ref = this.dialogService.open(ModalEspecificacionesComponent, {
        header: "Producto",
        width: '40vw',
        data: {
          producto: producto,
        }
      });

      this.ref.onClose.subscribe((response: any) => {
        if (response) {
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

          this.productosEnviar.push(facturaDetalles)

          this.productosSelect.push(response);

          this.form.controls['facturaDetalles'].setValue(this.productosEnviar)
          console.log(this.productosSelect);
          console.log(this.form.value);
        }
      })
    }

  }


  cargaCliente(){
    let idCliente = this.form.controls['clienteId'].value;
    if(idCliente != null || idCliente != undefined){
      this.loading = true;
      this.MainService.ClientesService.get(idCliente).subscribe({
        next: (req:any) => {
          this.cliente = req
          this.form.controls['direccion'].setValue(this.cliente.direccion);
        },
        error: (err: any) => {
          console.log(err)
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
        this.clienteSelect =req.data;
      },
      error: (err: any) => {
        console.log(err)
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
        tipo: this.tipo,
        facturaDetalles: this.form.value.facturaDetalles
      }

      this.MainService.FacturaService.GenerarFactura(factura).subscribe({
        next: (req:any) => {
          console.log(req);
          if(req.isSuccess){
          }else{
          }

        },
        error: (err: any) => {
          console.log(err)
          this.loading = false
        },
        complete: () => {
          this.productosEnviar = [];
          this.productosSelect = [];
          this.loading = false
        }
      })
    }else{
    }
  }

}
