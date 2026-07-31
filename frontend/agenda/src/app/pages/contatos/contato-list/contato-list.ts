import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ContatoService } from '../../../core/services/contato.service';
import { Contato } from '../../../models/contato.model';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type TipoContato = 'todos' | 'cliente' | 'fornecedor' | 'parceiro';

@Component({
  selector: 'app-contatos',
  standalone: true,
    imports: [
    CommonModule,

    FormsModule,

    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule
  ],
  templateUrl: './contato-list.html',
  styleUrl: './contato-list.scss',
})
export class ContatoList implements OnInit {

  private contatoService = inject(ContatoService);

  readonly loading = signal(false);

  readonly contatos = signal<Contato[]>([]);

  search = '';

  selectedFilter: TipoContato = 'todos';

  readonly contatosFiltrados = computed(() => {

    const texto = this.search.trim().toLowerCase();

    return this.contatos().filter(contato => {

      const correspondeBusca =
        !texto ||
        contato.nome?.toLowerCase().includes(texto) ||
        contato.email?.toLowerCase().includes(texto) ||
        contato.empresa?.toLowerCase().includes(texto);

      const correspondeTipo =
        this.selectedFilter === 'todos' ||
        contato.tipo?.toLowerCase() === this.selectedFilter;

      return correspondeBusca && correspondeTipo;

    });

  });

  ngOnInit(): void {
    this.carregarContatos();
  }

  carregarContatos(): void {

    this.loading.set(true);

    this.contatoService.obterContatos().subscribe({

      next: (contatos) => {

        this.contatos.set(contatos);

        this.loading.set(false);

      },

      error: (erro) => {

        console.error('Erro ao carregar contatos', erro);

        this.loading.set(false);

      }

    });

  }

  selecionarFiltro(tipo: TipoContato): void {
    this.selectedFilter = tipo;
  }

  novoContato(): void {

    // TODO:
    // Abrir Dialog para cadastro

  }

  importarLote(): void {

    // TODO:
    // Abrir seleção de arquivo

  }

  visualizarPerfil(contato: Contato): void {

    // TODO:
    // Navegar para detalhes

    console.log(contato);

  }

}