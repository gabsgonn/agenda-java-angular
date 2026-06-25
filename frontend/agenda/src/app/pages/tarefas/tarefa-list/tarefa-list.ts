import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';

import { Tarefa } from '../../../models/tarefa-model';
import { TarefaService } from '../../../core/services/tarefa.service';
import { StatusTarefaEnum } from '../../../shared/enums/status-tarefa.enum';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'scss-tarefa-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './tarefa-list.html',
  styleUrl: './tarefa-list.scss',
})
export class TarefaList implements OnInit {
  form!: FormGroup;
  carregando = true;

  opcoesStatus = Object.entries(StatusTarefaEnum).map(([chave, valor]) => ({
    chave,
    valor,
  }));

  constructor(
    private fb: FormBuilder,
    private tarefaService: TarefaService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tarefas: this.fb.array([]),
    });

    this.carregarTarefas();
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
      },
      error: (err) => {
        console.error(err);
        this.carregando = false;
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
