import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { IProductCard } from 'src/app/models/crud/productos';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product?: IProductCard;
  @Input() swVer?: Boolean;
  @Output () verEmit: EventEmitter<Boolean> = new EventEmitter();
  @Output () agregarEmit: EventEmitter<Boolean> = new EventEmitter();
  @Output () editarEmit: EventEmitter<Boolean> = new EventEmitter();
  @Output () eliminarEmit: EventEmitter<Boolean> = new EventEmitter();
  @Output () formulaEmit: EventEmitter<Boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ver(){
    this.verEmit.emit(true);
  }

  editar(){
    this.editarEmit.emit(true);
  }

  eliminar(){
    this.eliminarEmit.emit(true);
  }

  formula(){
    this.formulaEmit.emit(true);
  }

  agregar(){
    this.agregarEmit.emit(true);
  }


}
