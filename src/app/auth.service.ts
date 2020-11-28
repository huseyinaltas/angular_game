import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthServ {

  public isAuthenticated:boolean;

  constructor(private router: Router, private auth: AuthService) {
  }

   checkAuthenticated() {
    const authenticated =  this.auth.isAuthenticated$;
    return authenticated;
  }

   login() {
    return this.auth.loginWithRedirect();

  }

   logout() {
   return  this.auth.logout();

  }
}
