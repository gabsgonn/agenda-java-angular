import { Contato } from './contato.model';

export interface Tarefa {
  id?: number;
  titulo: string;
  descricao?: string;
  data?: string;
  horario?: string;
  prioridade?: 'BAIXA' | 'MEDIA' | 'ALTA';
  status?: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
  dataCriacao?: string;
  dataConclusao?: string;
  contatos?: Contato[];
}
