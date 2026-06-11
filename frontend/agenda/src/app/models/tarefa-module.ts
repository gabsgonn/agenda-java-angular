import { PrioridadeTarefaEnum } from '../shared/enums/prioridade-tarefa.enum';
import { StatusTarefaEnum } from '../shared/enums/status-tarefa.enum';
import { Contato } from './contato.model';

export interface Tarefa {
  id?: number;
  titulo: string;
  descricao?: string;
  data?: string;
  horario?: string;
  prioridade?: PrioridadeTarefaEnum;
  status?: StatusTarefaEnum;
  dataCriacao?: string;
  dataConclusao?: string;
  contatos?: Contato[];
}
