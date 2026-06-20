import { Routes } from '@angular/router';
import { TarefaList } from './pages/tarefas/tarefa-list/tarefa-list';
import { TarefaForm } from './pages/tarefas/tarefa-form/tarefa-form';

export const routes: Routes = [
  { path: '', redirectTo: 'tarefas', pathMatch: 'full' },
  { path: 'tarefas', component: TarefaList },
  { path: 'tarefas/formulario', component: TarefaForm },
];
