import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoriasComponent } from './modal-categorias.component';

describe('ModalCategoriasComponent', () => {
  let component: ModalCategoriasComponent;
  let fixture: ComponentFixture<ModalCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCategoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
