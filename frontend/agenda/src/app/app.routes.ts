import { Routes } from '@angular/router';
import { TarefaList } from './pages/tarefas/tarefa-list/tarefa-list';

export const routes: Routes = [
  { path: '', redirectTo: 'tarefas', pathMatch: 'full' },
  { path: 'tarefas', component: TarefaList },
];
