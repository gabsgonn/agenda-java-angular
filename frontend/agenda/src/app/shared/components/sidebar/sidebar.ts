import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RawIcons, IconFactory } from '../../../shared/icons';

@Component({
  selector: 'app-sidebar-component',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();

  icons: ReturnType<typeof IconFactory.create<typeof RawIcons>>;
  items!: {
    routeLink: string;
    icon: SafeHtml;
    label: string;
  }[];

  constructor(private sanitizer: DomSanitizer) {
    this.icons = IconFactory.create(this.sanitizer, RawIcons);

    this.items = [
      {
        routeLink: '/tarefas',
        icon: this.icons.tarefas,
        label: 'Minhas Tarefas',
      },
      {
        routeLink: '/contatos',
        icon: this.icons.contatos,
        label: 'Meus Contatos',
      },
    ];
  }

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}