import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GameService } from '../api.services/game.room.service';
import { GameValidation } from '../api.services/game.validation.service';
import { ScoreService } from '../api.services/gamer.score.service';
import { loginInfo } from '../loginInfo';

@Component({
  selector: 'app-game-room-pc',
  templateUrl: './game-room-pc.component.html',
  styleUrls: ['./game-room-pc.component.css']
})
export class GameRoomPcComponent implements OnInit {
  panelOpenState;
  numberGuessedFromMe = [];
  isDisabled: boolean;
  gameOver: boolean;
  loginName: any;
  setNumToMe:any;
  oldScore:any;

  constructor(private scoreApi: ScoreService, private http: HttpClient, private router: Router, private api: GameService, private validation: GameValidation) { }

  ngOnInit(): void {
    this.loginName = loginInfo[0];
    this.numberGuessedFromMe[0]={num:"",posneg:""};
    this.getRandomString();

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
        this.scoreApi.getOneUserScore(this.loginName.toString()).subscribe(data => {
          this.oldScore = data['score'];
          this.scoreApi.updateAnUserScore(this.loginName, 100+Number(this.oldScore)).subscribe(data => data);
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





}
