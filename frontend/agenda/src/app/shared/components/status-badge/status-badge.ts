import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusTarefaEnum } from '../../enums/status-tarefa.enum';

const STATUS_CONFIG: Record<StatusTarefaEnum, { label: string; css: string }> = {
  [StatusTarefaEnum.Pendente]: {
    label: 'Pendente',
    css: 'pendente',
  },
  [StatusTarefaEnum.EmAndamento]: {
    label: 'Em andamento',
    css: 'em-andamento',
  },
  [StatusTarefaEnum.Concluida]: {
    label: 'Concluída',
    css: 'concluida',
  },
  [StatusTarefaEnum.Cancelada]: {
    label: 'Cancelada',
    css: 'cancelado',
  },
};

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {
  readonly status = input.required<StatusTarefaEnum>();

  readonly config = computed(() => STATUS_CONFIG[this.status()]);
}
