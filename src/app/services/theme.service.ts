import { Injectable, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isDarkMode } from '../app.signals';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const darkMode = isDarkMode();
      const body = this.document.body;

      if (darkMode) {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
      } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
      }
    });
  }

  toggleTheme(): void {
    isDarkMode.update(current => !current);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode()));
    }
  }

  initTheme(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedPreference = localStorage.getItem('darkMode');
      if (savedPreference !== null) {
        isDarkMode.set(JSON.parse(savedPreference));
      }
    }
  }
}