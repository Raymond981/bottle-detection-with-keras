import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarBoletoComponent } from './seleccionar-boleto.component';

describe('SeleccionarBoletoComponent', () => {
  let component: SeleccionarBoletoComponent;
  let fixture: ComponentFixture<SeleccionarBoletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarBoletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
