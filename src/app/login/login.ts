import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { form, FormField, required } from '@angular/forms/signals';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  protected model = signal({ email: '', password: '' });
  protected error = signal(false);
  protected submitting = signal(false);

  protected loginForm = form(this.model, (path) => {
    required(path.email, { message: "L'email est requis" });
    required(path.password, { message: 'Le mot de passe est requis' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.loginForm().valid()) {
      return;
    }

    this.error.set(false);
    this.submitting.set(true);
    const { email, password } = this.model();

    this.auth.login(email, password).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/']);
      },
      error: () => {
        this.submitting.set(false);
        this.error.set(true);
      },
    });
  }
}
