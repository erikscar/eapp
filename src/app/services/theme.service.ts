import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<'light' | 'dark'>('light')

  switchTheme() {
    const newTheme = this.theme() === "light" ? 'dark' : 'light';

    this.theme.set(newTheme);

    document.body.classList.remove('light-theme', 'dark-theme')
    document.body.classList.add(`${newTheme}-theme`)
  }
}
