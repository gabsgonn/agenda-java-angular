import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioridadeBadge } from './prioridade-badge';

describe('PrioridadeBadge', () => {
  let component: PrioridadeBadge;
  let fixture: ComponentFixture<PrioridadeBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrioridadeBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(PrioridadeBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
