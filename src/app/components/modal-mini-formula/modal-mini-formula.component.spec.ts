import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMiniFormulaComponent } from './modal-mini-formula.component';

describe('ModalMiniFormulaComponent', () => {
  let component: ModalMiniFormulaComponent;
  let fixture: ComponentFixture<ModalMiniFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMiniFormulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMiniFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
