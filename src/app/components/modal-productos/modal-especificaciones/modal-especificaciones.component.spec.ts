import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEspecificacionesComponent } from './modal-especificaciones.component';

describe('ModalEspecificacionesComponent', () => {
  let component: ModalEspecificacionesComponent;
  let fixture: ComponentFixture<ModalEspecificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEspecificacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEspecificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
