import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoList } from './contato-list';

describe('ContatoList', () => {
  let component: ContatoList;
  let fixture: ComponentFixture<ContatoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContatoList],
    }).compileComponents();

    fixture = TestBed.createComponent(ContatoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
