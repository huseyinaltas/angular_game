import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CookieService } from 'ngx-cookie-service';
import { ScoreService } from '../api.services/gamer.score.service';
import { loginInfo } from '../loginInfo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileJson: string = null;
  username = "";
  password = "";
  score;
  email;
  userNameinUs;
  changedUn = false;
  userNameChangeMessage="";

  constructor(public auth: AuthService, private scoreApi: ScoreService, public cookie:CookieService,
    public router:Router) {

  }

  ngOnInit() {
    this.cookie.set("url", this.router.url.substring(1))
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
    this.auth.user$.subscribe((data) => {
    this.scoreApi.getOneUserScore(data.email+"_"+data.sub.charAt(0)).subscribe(data => {
      this.score = data['score'];
      this.userNameinUs = data['gamerid'];
    });
    this.email = data.email+"_"+data.sub.charAt(0);
    });

  }

  changeUserName(user:string){
    this.scoreApi.updateAnUsername(this.email, user).subscribe(data =>{
      this.userNameChangeMessage = data['message'];
      if(this.userNameChangeMessage.includes("changed")){
        loginInfo[0]=user;
        return this.changedUn = true;
      }
      else{
        this.changedUn = true;
      }
    });

  }
}
