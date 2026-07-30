import { Routes } from '@angular/router';
import { TarefaList } from './pages/tarefas/tarefa-list/tarefa-list';
import { TarefaForm } from './pages/tarefas/tarefa-form/tarefa-form';
import { ContatoList } from './pages/contatos/contato-list/contato-list';
import { UserSettings } from './features/user-settings/user-settings';

export const routes: Routes = [
  { path: '', redirectTo: 'tarefas', pathMatch: 'full' },
  { path: 'tarefas', component: TarefaList },
  { path: 'tarefas/formulario', component: TarefaForm },
  { path: 'contatos', component: ContatoList },
  { path: 'configuracoes', component: UserSettings },
];
