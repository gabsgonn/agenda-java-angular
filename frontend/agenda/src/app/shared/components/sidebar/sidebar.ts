import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { tarefaIcon } from '../../icons';

@Component({
  selector: 'app-sidebar-component',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();

  items = [
    {
      routeLink: '/tarefas',
      icon: tarefaIcon,
      label: 'Minhas Tarefas',
    },
    {
      routeLink: '/contatos',
      icon: '/icons/contatos-icon.svg',
      label: 'Meus Contatos',
    }
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
