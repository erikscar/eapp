import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  constructor(private themeService: ThemeService) {}

  switchTheme(theme: "dark" | "light") {
    this.themeService.setTheme(theme);
  }
  
}
