import { Component, HostListener, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Sidebar } from "./shared/components/sidebar/sidebar";
import { Main } from "./shared/components/main/main";

@Component({
  selector: 'scss-root',
  imports: [ Sidebar, Main],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('agenda');

  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(1024);

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      this.screenWidth.set(width);
      this.isLeftSidebarCollapsed.set(width < 768);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      this.screenWidth.set(width);
      if (width < 768) {
        this.isLeftSidebarCollapsed.set(true);
      }
    }
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}