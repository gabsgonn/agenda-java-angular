import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaDetail } from './tarefa-detail';

describe('TarefaDetail', () => {
  let component: TarefaDetail;
  let fixture: ComponentFixture<TarefaDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(TarefaDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
