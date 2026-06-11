import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../../models/tarefa-model';
import { TarefaService } from '../../../core/services/tarefa.service';

@Component({
  selector: 'scss-tarefa-list',
  imports: [],
  templateUrl: './tarefa-list.html',
  styleUrl: './tarefa-list.scss',
})
export class TarefaList implements OnInit {
  listaDeTarefas: Tarefa[] = [];

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefaService.getAll().subscribe({
      next: (dados) => {
        this.listaDeTarefas = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar tarefas:', erro);
      },
    });
  }
}
