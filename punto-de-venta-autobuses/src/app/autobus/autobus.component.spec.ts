import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutobusComponent } from './autobus.component';

describe('AutobusComponent', () => {
  let component: AutobusComponent;
  let fixture: ComponentFixture<AutobusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutobusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutobusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
