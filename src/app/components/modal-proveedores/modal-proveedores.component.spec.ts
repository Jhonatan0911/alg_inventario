import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProveedoresComponent } from './modal-proveedores.component';

describe('ModalProveedoresComponent', () => {
  let component: ModalProveedoresComponent;
  let fixture: ComponentFixture<ModalProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProveedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
