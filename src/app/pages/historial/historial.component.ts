import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  form = new FormGroup({
    tipo: new FormControl('FACTURA', [Validators.required]),
    start: new FormControl(''),
    end: new FormControl(''),
  })

  constructor(
    public MainService: MainService
  ) { }

  ngOnInit(): void {
    this.carga();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  carga(){
    this.loading = true;
    this.MainService.FacturaService.get(this.form.value.tipo).subscribe({
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
      next: async (res:any) => {
        console.log(res);
        if(res.isSuccess){

          const docDefinition = {
            content: [
              {
                image: await this.getBase64ImageFromURL(
                  '../../assets/images/image_fac.jpg'
                ),
                width: 500,
                alignment: 'center',
              },
              {
                image: await this.getBase64ImageFromURL(
                  '../../assets/images/image_info.jpg'
                ),
                width: 500,
                alignment: 'center',
                margin: [0, 0, 0, 15]
              },
              {
                text: '',
                pageBreak: 'after',
              },
              {
                text: res.data.tipo + " " + res.data.descripcion,
                style: 'header',
              },
              {
                margin: [0, 8, 0, 0],
                columns: [
                  {
                    width: '*',
                    text: [
                      { text: 'NIT: ', fontSize: 10, bold: true },
                      { text: '900980561-9', fontSize: 10 }
                    ]
                  },
                  {
                    width: '*',
                    text: [
                      { text: 'cod. cliente: ', fontSize: 10, bold: true},
                      { text: res.data.clienteId, fontSize: 10 }
                    ]
                  },
                  {
                    width: '*',
                    text: [
                      { text: res.data.tipo, fontSize: 10, bold: true},
                      { text: res.data.precioTotal, fontSize: 10 }
                    ]
                  }
                ]
              },
              {
                margin: [0, 8, 0, 0],
                columns: [
                  {
                    width: '*',
                    text: [
                      { text: 'Nombre: ', fontSize: 10, bold: true},
                      { text: res.data.nombre, fontSize: 10 }
                    ]
                  },
                  {
                    width: '*',
                    text: [
                      { text: 'Empresa: ', fontSize: 10, bold: true },
                      { text: res.data.empresa, fontSize: 10 }
                    ]
                  },
                  {
                    width: '*',
                    text: [
                      { text: 'Dirección: ', fontSize: 10, bold: true},
                      { text: res.data.direccion, fontSize: 10 }
                    ]
                  }
                ]
              },
              {
                margin: [0, 8, 0, 0],
                columns: [
                  {
                    width: '*',
                    text: [
                      { text: 'Email: ', fontSize: 10, bold: true},
                      { text: res.data.correo, fontSize: 10 }
                    ]
                  },
                  {
                    width: '*',
                    text: [
                      { text: 'Teléfono: ', fontSize: 10, bold: true },
                      { text: res.data.telefono, fontSize: 10 }
                    ]
                  },
                  {
                    width: '*',
                    text: [
                      { text: 'Atención Sr: ', fontSize: 10, bold: true},
                      { text: res.data.nombre, fontSize: 10 }
                    ]
                  }
                ]
              },
              {
                margin: [0, 8, 0, 0],
                columns: [
                  {
                    width: '*',
                    text: [
                      { text: 'Departamento: ', fontSize: 10, bold: true},
                      { text: res.data.departamento, fontSize: 10 }
                    ]
                  },
                  {
                    width: '*',
                    text: [
                      { text: 'Municipio: ', fontSize: 10, bold: true },
                      { text: res.data.municipio, fontSize: 10 }
                    ]
                  },
                  {
                    width: '*',
                    text: [
                      { text: 'Vendedor: ', fontSize: 10, bold: true},
                      { text: 'WILLIAM VENDE BONICE', fontSize: 10 }
                    ]
                  }
                ]
              },
              {
                style: 'tableExample',
                table: {
                  headerRows: 1,
                  widths: [30, 30, 35, 35, 35, 35, 35, 35, 35, 35, 33, 33],
                  heights: 26,
                  body: [
                    [
                      { text: 'Condiciones de pago: ', colSpan: 2, fontSize: 10, margin: [0, 6, 0, 0] },
                      {},
                      { text: '70 % INICIAL SALDO A LA ENTREGA', fontSize: 12, margin: [0, 7, 0, 0], alignment: 'center', colSpan: 8,  bold: true },
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
                      { text: 'COD', alignment: 'center', fontSize: 10, margin: [0, 7, 0, 0] },
                      { text: 'CANT', alignment: 'center', fontSize: 10, margin: [0, 7, 0, 0] },
                      { text: 'DESCRIPCION', alignment: 'center', fontSize: 10, margin: [0, 7, 0, 0], colSpan: 8, bold: true },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: 'UNI', alignment: 'center', fontSize: 10, margin: [0, 7, 0, 0] },
                      { text: 'TOTAL', alignment: 'center', fontSize: 10, margin: [0, 7, 0, 0] },
                    ],
                    ...res.data.detallefacturas.map((detalle:any) => [
                      { text: detalle.id.toString(), alignment: 'center', fontSize: 10, margin: [0, 7, 0, 0] },
                      { text: detalle.cantidad.toString(), alignment: 'center', fontSize: 10, margin: [0, 7, 0, 0] },
                      { text: detalle.etiqueta, colSpan: 8, fontSize: 10, margin: [0, 7, 0, 0] },
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: detalle.precio_UNITARIO.toString(), alignment: 'center', fontSize: 10, margin: [0, 7, 0, 0] },
                      { text: detalle.precio_UNITARIO.toString(), alignment: 'center', fontSize: 10, margin: [0, 7, 0, 0] },
                    ]),
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
                      { text: 'Fabricación y garantia propia \n\n NO INCLUYE EL ENVIO \n\n Validez de la oferta : 15 dias Hábiles \n\n A Nombre de : Aire Limpio Global S.A.S RIF \n\n Banco DE BOGOTA  CTA CORRIENTE 151 52855 1' , fontSize: 9, margin: [0, 7, 0, 7], colSpan: 8 },
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
                    // [
                    //   { text: '' },
                    //   { text: '' },
                    //   { text: 'NO INCLUYE EL ENVIO', fontSize: 10, margin: [0, 7, 0, 0] , colSpan: 8 },
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   { text: '' },
                    //   { text: '' },
                    // ],
                    // [
                    //   { text: '' },
                    //   { text: '' },
                    //   { text: 'Validez de la oferta : 15 dias Hábiles', fontSize: 10, margin: [0, 7, 0, 0], colSpan: 8 },
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   { text: '' },
                    //   { text: '' },
                    // ],
                    // [
                    //   { text: '' },
                    //   { text: '' },
                    //   { text: 'A Nombre de : Aire Limpio Global S.A.S RIF', fontSize: 10, margin: [0, 7, 0, 0], colSpan: 8 },
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   { text: '' },
                    //   { text: '' },
                    // ],
                    // [
                    //   { text: '' },
                    //   { text: '' },
                    //   { text: 'Banco DE BOGOTA  CTA CORRIENTE 151 52855 1', fontSize: 10, margin: [0, 7, 0, 0] , colSpan: 8 },
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   {},
                    //   { text: '' },
                    //   { text: '' },
                    // ],
                    [
                      { text: 'Atentamente: Ing. Edgar Silva', fontSize: 10, margin: [0, 6, 0, 0] , colSpan: 4},
                      {},
                      {},
                      {},
                      { text: '', colSpan: 6 },
                      {},
                      {},
                      {},
                      {},
                      {},
                      { text: 'IVA 19%', fontSize: 9, margin: [0, 6, 0, 0] },
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
              fontSize: 12,
              columnGap: 20
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


  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }
}
