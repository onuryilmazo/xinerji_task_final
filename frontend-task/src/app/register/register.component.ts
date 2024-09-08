import { Component } from '@angular/core';
import { RegisterService } from '../register.service';
import { FormsModule} from '@angular/forms';
import { CommonModule, NgFor } from "@angular/common";
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  hideConfirm = true;
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private registerService: RegisterService, private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.username === '' || this.password === '' || this.confirmPassword == '') {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    if (this.username.includes(' ') || this.password.includes(' ')) {
      this.errorMessage = 'Username or password should not contain spaces';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    const userData = {
      username: this.username,
      password: this.password,
    };

    this.registerService.registerUser(userData).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);  // Redirect to the login page if the registration is successful
      },
      error: (error) => {
        if (error.status === 403) {
          this.errorMessage = 'Username already in use';
        } else {
          this.errorMessage = 'Registration failed';
        }
      }
    });
  }
}
