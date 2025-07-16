import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  sidebarOpen: boolean = false;
  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;

    setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 250);
  }

  logOut(): void {
    this.router.navigate(['/'])
    localStorage.clear()
    sessionStorage.clear()
  }
}
