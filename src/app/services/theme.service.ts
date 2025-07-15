import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  setTheme(theme: "dark" | "light") {
    document.body.classList.remove('dark-theme', 'light-theme')
    document.body.classList.add(`${theme}-theme`)
  }
}
