import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit, AfterViewInit {

  loading: boolean = false;

  displayedColumns: string[] = ['fecha', 'cliente', 'empresa', 'descripcion', 'precioTotal', 'act'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    public MainService: MainService
  ) { }

  ngOnInit(): void {
    this.carga('FACTURA');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  carga(tipo: string){
    this.loading = true;
    this.MainService.FacturaService.get(tipo).subscribe({
      next: (req:any) => {
        this.dataSource = new MatTableDataSource(req.data);
        this.dataSource.paginator = this.paginator;
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

  descargar(element:any){
    console.log(element);
    this.loading = true;
    this.MainService.FacturaService.getById(element.id).subscribe({
      next: (res:any) => {
        console.log(res);
        if(res.isSuccess){

          const docDefinition = {
            content: [
              {
                text: res.data.descripcion,
                style: 'header',
              },
              {
                style: 'tableExample',
                table: {
                  headerRows: 1,
                  widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                  heights: 27,
                  body: [
                    [
                      { text: 'NIT: ', colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      { text: '900980561-9', colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      { text: 'cod. cliente', colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      { text: res.data.clienteId, colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      { text: res.data.tipo, colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      { text: res.data.precioTotal, colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                    ],
                    [
                      { text: 'Empresa: ', colSpan: 3, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      {},
                      { text: res.data.empresa, colSpan: 3, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      {},
                      { text: 'Atención Sr.', colSpan: 3, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      {},
                      { text: res.data.nombre, colSpan: 3, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      {},
                    ],
                    [
                      { text: 'Dirección: ', colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      { text: res.data.clienteId, colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      { text: 'Email: ', colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      { text: res.data.clienteId, colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      { text: 'Vendedor: ', colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      { text: res.data.clienteId, colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                    ],
                    [
                      { text: 'Dep. ', colSpan: 3, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      {},
                      { text: res.data.empresa, colSpan: 3, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      {},
                      { text: 'Municipio: ', colSpan: 3, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      {},
                      { text: res.data.nombre, colSpan: 3, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      {},
                    ],
                    [
                      { text: 'Condiciones de pago: ', colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      { text: '70 % INICIAL SALDO A LA ENTREGA', fontSize: 10, margin: [0, 6, 0, 0] , colSpan: 8 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: '', colSpan: 2 },
                      {},
                    ],
                    [
                      { text: 'COD', alignment: 'center', fontSize: 10, margin: [0, 6, 0, 0] },
                      { text: 'CANT', alignment: 'center', fontSize: 10, margin: [0, 6, 0, 0] },
                      { text: 'DESCRIPCION', alignment: 'center', fontSize: 10, margin: [0, 6, 0, 0], colSpan: 8 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: 'UNI', alignment: 'center', fontSize: 10, margin: [0, 6, 0, 0] },
                      { text: 'TOTAL', alignment: 'center', fontSize: 10, margin: [0, 6, 0, 0] },
                    ],
                    [
                      { text: '' },
                      { text: '' },
                      { text: '', colSpan: 8 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: '' },
                      { text: '' },
                    ],
                    [
                      { text: '' },
                      { text: '' },
                      { text: '', colSpan: 8 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: '' },
                      { text: '' },
                    ],
                    [
                      { text: '' },
                      { text: '' },
                      { text: '', colSpan: 8 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: '' },
                      { text: '' },
                    ],
                    [
                      { text: '' },
                      { text: '' },
                      { text: '', colSpan: 8 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: '' },
                      { text: '' },
                    ],
                    [
                      { text: '' },
                      { text: '' },
                      { text: 'Fabricación y garantia propia', fontSize: 10, margin: [0, 6, 0, 0], colSpan: 8 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: '' },
                      { text: '' },
                    ],
                    [
                      { text: '' },
                      { text: '' },
                      { text: 'NO INCLUYE EL ENVIO', fontSize: 10, margin: [0, 6, 0, 0] , colSpan: 8 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: '' },
                      { text: '' },
                    ],
                    [
                      { text: '' },
                      { text: '' },
                      { text: 'Validez de la oferta : 15 dias Hábiles', fontSize: 10, margin: [0, 6, 0, 0], colSpan: 8 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: '' },
                      { text: '' },
                    ],
                    [
                      { text: '' },
                      { text: '' },
                      { text: 'A Nombre de : Aire Limpio Global S.A.S RIF', fontSize: 10, margin: [0, 6, 0, 0], colSpan: 8 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: '' },
                      { text: '' },
                    ],
                    [
                      { text: '' },
                      { text: '' },
                      { text: 'Banco DE BOGOTA  CTA CORRIENTE 151 52855 1', fontSize: 10, margin: [0, 6, 0, 0] , colSpan: 8 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: '' },
                      { text: '' },
                    ],
                    [
                      { text: 'Atentamente: Ing. Edgar Silva', fontSize: 10, margin: [0, 6, 0, 0] , colSpan: 2},
                      {},
                      { text: '', colSpan: 8 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: 'IVA 19 %', fontSize: 10, margin: [0, 6, 0, 0] },
                      { text: res.data.precioTotal, fontSize: 10, margin: [0, 6, 0, 0] },
                    ]
                  ]
                }
              },
              {
                alignment: 'justify',
                columns: [
                  {
                    text: 'RECIBI CONFORME',
                    fontSize: 10
                  },
                  {
                    text: 'ALG',
                    fontSize: 10
                  }
                ]
              },
              {
                alignment: 'justify',
                columns: [
                  {
                    text: '__________________________________________'
                  },
                  {
                    text: '__________________________________________'
                  }
                ],
                style: 'tableExample'
              },
              {text: 'Telefonos: 323 2280518 /300 2827340 \n\n', fontSize: 8, bold: true},
              {text: 'Barranquilla  Carrera 10  calle 53  Torre La Maracrena   Torre 30  Ofc. 1107 \n\n', fontSize: 8, bold: true},
              {text: 'Calle 75A #107-14 Barrio Garcés Navas-Bogotá \n\n', fontSize: 8, bold: true},
            ]as any,
            styles: {
              header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
              },
              tableExample: {
                margin: [0, 5, 0, 15],
                padding: [0, 5, 0, 15]
              },
              tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
              }
            } as any,
            defaultStyle: {
              fontSize: 12
            }
          };


          pdfMake.createPdf(docDefinition).download(`Factura_${element.nombre}_${element.fechaCreacion}.pdf`);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: res.mensaje,
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
