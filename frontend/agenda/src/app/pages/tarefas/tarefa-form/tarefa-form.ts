import { CommonModule, formatDate, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tarefa } from '../../../models/tarefa-model';
import { TarefaService } from '../../../core/services/tarefa.service';
import { ContatoService } from '../../../core/services/contato.service';
import { StatusTarefaEnum } from '../../../shared/enums/status-tarefa.enum';
import { PrioridadeTarefaEnum } from '../../../shared/enums/prioridade-tarefa.enum';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { Observable, tap } from 'rxjs';
import { Contato } from '../../../models/contato.model';

@Component({
  selector: 'scss-tarefa-form',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatCardModule,
  ],
  templateUrl: './tarefa-form.html',
  styleUrls: ['./tarefa-form.scss'],
})
export class TarefaForm implements OnInit {
  form!: FormGroup;
  contatos$: Observable<Contato[]>;

  opcoesStatus = Object.entries(StatusTarefaEnum).map(([chave, valor]) => {
    const valorFormatado = valor
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (letra) => letra.toUpperCase());

    return {
      chave,
      valor: valorFormatado,
    };
  });

  opcoesPrioridade = Object.entries(PrioridadeTarefaEnum).map(([chave, valor]) => {
    const valorFormatado = valor
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (letra) => letra.toUpperCase());

    return {
      chave,
      valor: valorFormatado,
    };
  });

  constructor(
    private tarefasService: TarefaService,
    private contatoService: ContatoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.form = this.fb.group({
      titulo: [null, Validators.required],
      descricao: [null],
      data: [new Date(), Validators.required],
      horario: [new Date(), Validators.required],
      prioridade: [PrioridadeTarefaEnum.Baixa],
      status: [StatusTarefaEnum.Pendente],
      dataCriacao: [new Date()],
      dataConclusao: [null],
      contatos: this.fb.array([]),
    });

    this.contatos$ = this.contatoService.obterContatos().pipe(
      tap((dados) => {
        this.contatosArray.clear();
        dados.forEach((contato) => {
          this.contatosArray.push(this.criarGrupoContato(contato));
        });
      }),
    );
  }

  get contatosArray(): FormArray {
    return this.form.get('contatos') as FormArray;
  }
  get tarefasFormArray(): FormArray {
    return this.form.get('tarefas') as FormArray;
  }

  dataClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }
    return '';
  };

  private criarGrupoContato(contato: Contato): FormGroup {
    return this.fb.group({
      id: [contato.id],
      name: [contato.name],
      telefone: [contato.telefone],
    });
  }

  private criarGrupoTarefa(tarefa: Tarefa): FormGroup {
    return this.fb.group({
      titulo: [tarefa.titulo],
      descricao: [tarefa.descricao],
      data: [tarefa.data],
      horario: [tarefa.horario],
      prioridade: [tarefa.prioridade],
      status: [tarefa.status],
    });
  }

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // this.salvarTarefa();
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onCancel() {
    console.log(this.form.value);
  }

  salvarTarefa() {
    if (this.form.valid) {
      const dadosFormatados = { ...this.form.value };
      if (dadosFormatados.data) {
        dadosFormatados.data = formatDate(dadosFormatados.data, 'yyyy-MM-dd', 'en-US');
      }

      this.tarefasService.cadastrarTarefa(this.form.value).subscribe({
        next: () => alert('Tarefa salva com sucesso!'),
        error: (err) => console.log('Erro ao salvar', err),
      });
    }
  }
}
