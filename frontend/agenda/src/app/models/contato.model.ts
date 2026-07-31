export interface Contato {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  tipo: 'cliente' | 'fornecedor' | 'parceiro';
  foto?: string;
}