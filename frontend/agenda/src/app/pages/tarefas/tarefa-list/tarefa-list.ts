import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';

import { Tarefa } from '../../../models/tarefa-model';
import { TarefaService } from '../../../core/services/tarefa.service';
import { StatusTarefaEnum } from '../../../shared/enums/status-tarefa.enum';

@Component({
  selector: 'scss-tarefa-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    private tarefaService: TarefaService,
    private fb: FormBuilder,
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
        // this.tarefasFormArray.clear();
        // dados.forEach((tarefa) => {
        //   this.tarefasFormArray.push(this.criarGrupoTarefa(tarefa));
        // });

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
        alert('Tarefa deletada com sucesso. :)');
        this.tarefasFormArray.removeAt(index);
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
        // this.carregarTarefas();
      },
      error: (err) => {
        console.error(err);
        alert('Não foi possível atualizar o status.');
      },
    });
  }
}
