import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'app-theme';

  initTheme(): void {
    const savedTheme = localStorage.getItem(this.storageKey) || 'light';
    this.applyTheme(savedTheme);
  }

  toggleTheme(): void {
    const nextTheme = this.isDarkMode() ? 'light' : 'dark';
    this.applyTheme(nextTheme);
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark-theme');
  }

  private applyTheme(theme: string): void {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      localStorage.setItem(this.storageKey, 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem(this.storageKey, 'light');
    }
  }
}
