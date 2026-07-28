import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export class IconFactory {
  static create<T extends Record<string, string>>(
    sanitizer: DomSanitizer,
    icons: T
  ): { [K in keyof T]: SafeHtml } {

    return Object.fromEntries(
      Object.entries(icons).map(([key, value]) => [
        key,
        sanitizer.bypassSecurityTrustHtml(value),
      ])
    ) as { [K in keyof T]: SafeHtml };

  }
}