import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';  // JWT için kütüphaneyi kullan

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');  // The token is retrieved from the localStorage in the browser

    if (token && !this.jwtHelper.isTokenExpired(token)) { 
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
