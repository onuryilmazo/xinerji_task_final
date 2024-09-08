import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ]
})
export class HomeComponent {
  constructor(private router: Router) {}

  onLogout() {
    // Clear the token from localStorage or sessionStorage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  
    // Redirect the user to the login page
    this.router.navigate(['/login']);
  }
  
}
