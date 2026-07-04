import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PrioridadeTarefaEnum } from '../../enums/prioridade-tarefa.enum';

const PRIORIDADE_CONFIG: Record<PrioridadeTarefaEnum, { label: string; css: string }> = {
  [PrioridadeTarefaEnum.Alta]: {
    label: 'Alta',
    css: 'alta',
  },
  [PrioridadeTarefaEnum.Media]: {
    label: 'Média',
    css: 'media',
  },
  [PrioridadeTarefaEnum.Baixa]: {
    label: 'Baixa',
    css: 'baixa',
  },
};

@Component({
  selector: 'app-prioridade-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './prioridade-badge.html',
  styleUrl: './prioridade-badge.scss',
})
export class PrioridadeBadge {
  readonly prioridade = input.required<PrioridadeTarefaEnum>();

  readonly config = computed(() => PRIORIDADE_CONFIG[this.prioridade()]);
}
