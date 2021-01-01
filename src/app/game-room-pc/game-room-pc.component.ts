import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GameService } from '../api.services/game.room.service';
import { GameValidation } from '../api.services/game.validation.service';
import { ScoreService } from '../api.services/gamer.score.service';
import { loginInfo } from '../loginInfo';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AuthService } from '@auth0/auth0-angular';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-game-room-pc',
  templateUrl: './game-room-pc.component.html',
  styleUrls: ['./game-room-pc.component.css']
})
export class GameRoomPcComponent implements OnInit {
  panelOpenState;
  panelOpenStateForPossiblities;
  numberGuessedFromMe = [];
  isDisabled: boolean;
  gameOver: boolean;
  loginName: any;
  setNumToMe:any;
  oldScore:any;
  email;
  colors1=['0','1','2','3','4','5','6','7','8','9'];
  colors2=['0','1','2','3','4','5','6','7','8','9'];
  finalColor1=[true, true, true, true, true, true, true, true, true, true];
  finalColor2=[true, true, true, true, true, true, true, true, true, true];

  constructor(private scoreApi: ScoreService, private http: HttpClient,
     private router: Router, private api: GameService, public cookie:CookieService,
      private validation: GameValidation, public auth: AuthService) {
        this.auth.user$.subscribe(data => this.email = data.email+"_"+data.sub.charAt(0));


       }

  ngOnInit(): void {
    this.api.updateCount().subscribe(data => data);
    this.cookie.set("url", this.router.url.substring(1))

    console.log("email: "+this.email);

    this.loginName = loginInfo[0];
    this.numberGuessedFromMe[0]={num:"",posneg:""};
    this.getRandomString();

  }
  reload(){
    location.reload();
  }

  getRandomString() {
    var randomChars = '0123456789';
    var result = '';
    for ( var i = 0; i < 5; i++ ) {
      var char = randomChars.charAt(Math.floor(Math.random() * randomChars.length));

      if(char.toString()=='0' && i==0){
        i=-1;
        continue;
      }
        result += char;
        randomChars = randomChars.replace(char,"");
        this.setNumToMe=result;

    }
    return;
}


  validate(guess: any) {

   this.panelOpenState=true;

   if(isNaN(Number(guess)) || guess==null || guess==""){
   guess = "0";

  }

    if (guess) {
      var data = this.validation.returnResult(this.setNumToMe, guess);
      if(data.toString()=="+++++"){
        this.gameOver=true;
        this.scoreApi.getOneUserScore(this.email).subscribe(data => {
          this.oldScore = data['score'];
          this.scoreApi.updateAnUserScore(this.email, 100+Number(this.oldScore)).subscribe(data => data);
          });



      }
        if(guess.length!=5 || data.toString().length>5){
          this.numberGuessedFromMe.push({num:"Enter 5 unique digits!", posneg:null});
        }
      else if(guess.length==5) {
        this.numberGuessedFromMe.push({num:guess, posneg:data.toString()});
      }

      }

  }


onclick(color){
  var num:number = color;
  if(this.finalColor1[num]==false)
     return this.finalColor1[color]=true;
  else
   return this.finalColor1[num]=false;
}

onclick1(color){
var num:number = color;
  if(this.finalColor2[num]==false)
     return this.finalColor2[color]=true;
  else
   return this.finalColor2[num]=false;


}

drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.colors2, event.previousIndex, event.currentIndex);
}

}
