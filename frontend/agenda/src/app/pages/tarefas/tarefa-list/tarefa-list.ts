import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../../models/tarefa-model';
import { TarefaService } from '../../../core/services/tarefa.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
  Form,
} from '@angular/forms';
import { StatusTarefaEnum } from '../../../shared/enums/status-tarefa.enum';
import { error } from 'node:console';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'scss-tarefa-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarefa-list.html',
  styleUrl: './tarefa-list.scss',
})
export class TarefaList implements OnInit {
  form!: FormGroup;

  opcoesStatus = Object.entries(StatusTarefaEnum).map(([chave, valor]) => ({
    chave,
    valor,
  }));

  constructor(
    private tarefaService: TarefaService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    // 1. Inicializa o formulário principal contendo um FormArray vazio
    this.form = this.fb.group({
      tarefas: this.fb.array([]),
    });

    this.carregarTarefas();
  }

  // Getter para facilitar o acesso ao FormArray no HTML e no TS
  get tarefasFormArray(): FormArray {
    return this.form.get('tarefas') as FormArray;
  }

  carregarTarefas(): void {
    this.tarefaService.getAll().subscribe({
      next: (dados: Tarefa[]) => {
        // 2. Limpa o array caso já existam dados
        this.tarefasFormArray.clear();

        // 3. Para cada tarefa recebida da API, cria um grupo de formulário e insere no FormArray
        dados.forEach((tarefa) => {
          this.tarefasFormArray.push(this.criarGrupoTarefa(tarefa));
        });
      },
      error: (erro) => {
        console.error('Erro ao buscar tarefas:', erro);
      },
    });
  }

  // Método auxiliar para transformar o modelo da Tarefa em controles do formulário
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

  // get statusFormArray(): FormArray {
  //   return this.form.get('tarefas') as FormArray;
  // }

  // Método disparado pelo clique do botão Submit
  updateStatusDaTarefa(index: number): void {
    const agrupar = this.tarefasFormArray.at(index);
    const id = agrupar.get('id')?.value;
    const status = agrupar.get('status')?.value;

    this.tarefaService.updateStatus(id, status).subscribe({
      next: () => alert('Status da tarefa atualizado com sucesso!'),
      error: (err) => console.error(err),
    });
  }
}
