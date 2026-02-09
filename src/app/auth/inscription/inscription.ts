import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { userName, email, password, confirmPassword } = form.value;

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      this.authService.register({ userName, email, password }).subscribe({
        next: (user) => {
          console.log('Registration successful', user);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration error', err);
          alert('Registration failed');
        }
      });
    }
  }
}
