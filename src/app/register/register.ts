import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { form, FormField, required } from '@angular/forms/signals';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormField, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  protected model = signal({ name: '', email: '', password: '' });
  protected error = signal('');
  protected submitting = signal(false);

  protected registerForm = form(this.model, (path) => {
    required(path.name, { message: 'Le nom est requis' });
    required(path.email, { message: "L'email est requis" });
    required(path.password, { message: 'Le mot de passe est requis' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.registerForm().valid()) {
      return;
    }

    this.error.set('');
    this.submitting.set(true);
    const { name, email, password } = this.model();

    this.auth.register(name, email, password).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.submitting.set(false);
        if (err.status === 409) {
          this.error.set('Cet email est déjà utilisé.');
        } else {
          this.error.set("L'inscription a échoué.");
        }
      },
    });
  }
}
