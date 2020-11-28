import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { ScoreService } from '../api.services/gamer.score.service';

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

  constructor(public auth: AuthService, private scoreApi: ScoreService,) {

  }

  ngOnInit() {
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
        return this.changedUn = true;
      }
      else{
        this.changedUn = true;
      }
    });

  }
}
