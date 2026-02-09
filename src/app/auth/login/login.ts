import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      this.authService.login(email, password).subscribe({
        next: (users) => {
          if (users.length > 0) {
            console.log('Login successful');
            // Navigate to dashboard or home
            // this.router.navigate(['/']);
          } else {
            console.log('Invalid credentials');
            alert('Invalid credentials');
          }
        },
        error: (err) => {
          console.error('Login error', err);
          alert('Login failed');
        }
      });
    }
  }
}
