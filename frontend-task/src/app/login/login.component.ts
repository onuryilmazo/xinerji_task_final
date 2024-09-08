import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.username === '' || this.password === '') {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }
    const userData = {
      username: this.username,
      password: this.password
    };
  
    this.loginService.login(userData).subscribe({
      next: (response: any) => {  // We are using any because we expect a JWT token
        if (response) {
          localStorage.setItem('token', response);  // Save the JWT token to localStorage
          this.router.navigate(['/home']);  // Redirect to the Home page
        } else {
          this.errorMessage = 'Login failed';
        }
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';  
      }
    });
  }
}
