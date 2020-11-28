import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServ } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthServ, public router: Router) {}

  async canActivate() {
    if (!await this.authService.checkAuthenticated()) {
      await this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
