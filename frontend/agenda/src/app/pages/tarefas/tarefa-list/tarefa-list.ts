import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';

import { Tarefa } from '../../../models/tarefa-model';
import { TarefaService } from '../../../core/services/tarefa.service';
import { StatusTarefaEnum } from '../../../shared/enums/status-tarefa.enum';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { PrioridadeTarefaEnum } from '../../../shared/enums/prioridade-tarefa.enum';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { PrioridadeBadge } from '../../../shared/components/prioridade-badge/prioridade-badge';
import { FormatarDataRelativaPipe } from '../../../shared/pipes/formatar-data-relativa-pipe';
import { IconFactory, RawIcons } from '../../../shared/icons';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'scss-tarefa-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    StatusBadge,
    PrioridadeBadge,
    FormatarDataRelativaPipe,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule,
  ],
  templateUrl: './tarefa-list.html',
  styleUrl: './tarefa-list.scss',
})
export class TarefaList implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly tarefaService = inject(TarefaService);
  private readonly snackbarService = inject(SnackbarService);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly statusEnum = StatusTarefaEnum;
  readonly prioridadeEnum = PrioridadeTarefaEnum;

  form!: FormGroup;
  carregando = true;
  value = signal('Clear me');
  icons: ReturnType<typeof IconFactory.create<typeof RawIcons>>;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.icons = IconFactory.create(this.sanitizer, RawIcons);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      tarefas: this.fb.array([]),
    });

    if (isPlatformBrowser(this.platformId)) {
      this.carregarTarefas();
    }
  }

  get tarefasFormArray(): FormArray {
    return this.form.get('tarefas') as FormArray;
  }

  carregarTarefas(): void {
    this.carregando = true;
    this.tarefaService.obterTarefas().subscribe({
      next: (dados) => {
        const novosGrupos = dados.map((tarefa) => this.criarGrupoTarefa(tarefa));
        this.form.setControl('tarefas', this.fb.array(novosGrupos));
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }

  private criarGrupoTarefa(tarefa: Tarefa): FormGroup {
    return this.fb.group({
      id: [tarefa.id],
      titulo: [tarefa.titulo],
      descricao: [tarefa.descricao],
      data: [tarefa.data],
      horario: [tarefa.horario],
      prioridade: [tarefa.prioridade],
      status: [tarefa.status],
    });
  }

  deletarTarefa(index: number) {
    const grupo = this.tarefasFormArray.at(index);
    const { id } = grupo.value;

    this.tarefaService.deletarTarefa(id).subscribe({
      next: () => {
        this.tarefasFormArray.removeAt(index);
        this.snackbarService.mostrarMensagem('Tarefa deletada!');
        this.carregarTarefas();
      },
      error: (err) => {
        console.error(err);
        alert('Não foi possível deletar a tarefa. :(');
      },
    });
  }

  updateStatusDaTarefa(index: number) {
    const grupo = this.tarefasFormArray.at(index);
    const { id, status } = grupo.value;

    this.tarefaService.atualizarStatus(id, status).subscribe({
      next: () => {
        alert('Status da tarefa atualizado com sucesso!');
      },
      error: (err) => {
        console.error(err);
        alert('Não foi possível atualizar o status.');
      },
    });
  }
}
