import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIntegrantesComponent } from './lista-integrantes.component';

describe('ListaIntegrantesComponent', () => {
  let component: ListaIntegrantesComponent;
  let fixture: ComponentFixture<ListaIntegrantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaIntegrantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaIntegrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
