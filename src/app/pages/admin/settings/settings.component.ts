import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  lightColor = '';
  darkColor = '';

  constructor(private themeService: ThemeService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.lightColor = getComputedStyle(document.documentElement).getPropertyValue("--light-primary-color");
    this.darkColor = getComputedStyle(document.documentElement).getPropertyValue("--dark-primary-color")
  }

  switchTheme(theme: 'dark' | 'light') {
    this.themeService.switchTheme(theme);
  }

  applySystemTheme() {
    this.themeService.applySystemTheme();
  }

  applyThemeColors() {
    this.toastrService.success("Cores Alteradas com Sucesso!")
    document.documentElement.style.setProperty('--light-primary-color', this.lightColor);
    document.documentElement.style.setProperty('--dark-primary-color', this.darkColor);
  }

  
}
