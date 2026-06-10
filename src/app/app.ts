import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);
  protected auth = inject(AuthService);

  protected logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
