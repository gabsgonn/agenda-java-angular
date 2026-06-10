import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoForm } from './contato-form';

describe('ContatoForm', () => {
  let component: ContatoForm;
  let fixture: ComponentFixture<ContatoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ContatoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
