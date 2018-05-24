import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscricaoEventoComponent } from './inscricao-evento.component';

describe('InscricaoEventoComponent', () => {
  let component: InscricaoEventoComponent;
  let fixture: ComponentFixture<InscricaoEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscricaoEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscricaoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
