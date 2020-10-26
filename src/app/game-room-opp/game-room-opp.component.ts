import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, first, retry, take } from 'rxjs/operators';
import { isNumber, isString } from 'util';
import { LoginComponent } from '../login/login.component';
import { GameService } from '../api.services/game.room.service';
import { loginInfo } from '../loginInfo';
import { room } from '../loginInfo';
import { interval } from 'rxjs';
import { MethodCall } from '@angular/compiler';
import { CountdownModule } from 'ngx-countdown';
import { GameValidation } from '../api.services/game.validation.service';
import { ScoreService } from '../api.services/gamer.score.service';
import { browser } from 'protractor';

@Component({
  selector: 'app-game-room-opp',
  templateUrl: './game-room-opp.component.html',
  styleUrls: ['./game-room-opp.component.css']
})

@Injectable({providedIn: 'root'})
export class GameRoomOppComponent implements OnInit {
  @ViewChild('countdown', { static: false }) private counter: CountdownModule;
  numberGuessedForMine = [];
  panelOpenState;
  numberGuessedForOponents = [];
  loginName ="";
  gamer="Ozge";
  setNumToOpponent="";
  setNumToMe:any;
  isValid=true;
  isMessageShow=false;
  messageForSetNum="Please enter 5 unique digits like 12345";
  oponentName="";
  isClick=false;
  isDisabled;
  myinterval;
  gameReady=false;
  userReady="";
   me;
  opp;
  gameStarter;
  gameOver=false;
  whoWonGame="";
  whoWonGamePOST="3"
 gameOverInterval;
 passToOpponent;
 timeIsUp;
  oldScore: any;
  callNumber=0;
  newGameClicked=false;
  href;
  roomId;
  getNames;






  constructor(private scoreApi: ScoreService, private http: HttpClient, private router: Router, private api: GameService, private validation: GameValidation) { }

   ngOnInit() {
   this.href =  this.router.url;
   this.callNumber=0;
   this.roomId = room[0];

    this.numberGuessedForMine[0]={num:"",posneg:""};
    this.numberGuessedForOponents[0]={num:"",posneg:""};
    this.newGameClicked=false;


     this.loginName=loginInfo[0];


     this.getNames = setInterval(()=>{
     this.api.getRoomDetails(this.roomId).subscribe(
   data => {
    if(this.href != this.router.url){
      clearInterval(this.gameStarter);
      clearInterval(this.passToOpponent);
      clearInterval(this.getNames)
     return clearTimeout(this.timeIsUp);
    }
     if(this.loginName == data['firstGamerId']  || this.loginName == data['secondGamerId']){
     if(this.loginName == data['firstGamerId']){
       this.oponentName = data['secondGamerId'].toString();

     }
     else if(this.loginName == data['secondGamerId']){
       this.oponentName=data['firstGamerId'].toString();
     }
     clearInterval(this.getNames)
    }
   }
 );

}, 1000);

 this.gameStarter = setInterval(()=>{
  this.api.getRoomDetails(this.roomId).subscribe(
    data => {
  if(this.href != this.router.url){
    clearInterval(this.gameStarter);
    clearInterval(this.passToOpponent);
    clearInterval(this.getNames)
   return clearTimeout(this.timeIsUp);
  }


  if (this.callNumber<60) {



   if(this.loginName == data['firstGamerId']){
     this.api.getGamerDetails(data['secondGamerId']).subscribe(data => this.setNumToMe=data['setnumto'].toString());

   }

   else if(this.loginName == data['secondGamerId']){
     this.api.getGamerDetails(data['firstGamerId']).subscribe(data => this.setNumToMe=data['setnumto'].toString());
   }

   this.api.getGamerDetails( data['secondGamerId']).pipe(first()).subscribe(data => this.me=data['ready'].toString());
   this.api.getGamerDetails(data['firstGamerId']).pipe(first()).subscribe(data => this.opp=data['ready'].toString());

  //  console.log(this.me + "  "+this.opp);

   if(this.me=="1" && this.opp=="1"){
     this.gameReady=true;
   return clearInterval(this.gameStarter);


      }

   }
    this.callNumber++;

 if(this.callNumber>=60){
  clearInterval(this.gameStarter);
  clearInterval(this.passToOpponent);
 return this.router.navigateByUrl("/home");
}
    })
}, 1000);




   this.passToOpponent = setInterval(()=>{
    if( this.href !=  this.router.url){
      clearInterval(this.passToOpponent);
      clearInterval(this.gameStarter);
      clearTimeout(this.timeIsUp);
     }
   this.api.getRoomDetails(this.roomId).pipe(first()).subscribe((data =>{
        if(this.loginName == data['firstGamerId'] && data['whoNext'].toString()=="1" && this.gameReady==true){
          if( data['whoWon'].toString()=="1"){
            this.gameOver=true;
            this.whoWonGame=data['firstGamerId']
         return  clearInterval(this.passToOpponent);
          }
           else if(data['whoWon'].toString()=="2"){
            this.gameOver=true;
            this.whoWonGame= data['secondGamerId']
          return clearInterval(this.passToOpponent);
          }
             this.isDisabled=false;
             this.startTimer();
             this.numberGuessedForOponents.push({num:data['secondGamerGuess'].toString()});
           return clearInterval(this.passToOpponent);
         }
        else if(this.loginName==data['firstGamerId'] && data['whoNext'].toString()=="2"){
          if( data['whoWon'].toString()=="1"){
            this.gameOver=true;
            this.whoWonGame=data['firstGamerId']
         return  clearInterval(this.passToOpponent);
          }
           else if(data['whoWon'].toString()=="2"){
            this.gameOver=true;
            this.whoWonGame=data['secondGamerId']
          return clearInterval(this.passToOpponent);
          }
            this.isDisabled=true;


         }
        if(this.loginName==data['secondGamerId'] && data['whoNext'].toString()=="1"){
          if( data['whoWon'].toString()=="1"){
            this.gameOver=true;
            this.whoWonGame=data['firstGamerId']
         return  clearInterval(this.passToOpponent);
          }
           else if(data['whoWon'].toString()=="2"){
            this.gameOver=true;
            this.whoWonGame=data['secondGamerId']
          return clearInterval(this.passToOpponent);
          }
           this.isDisabled=true;


         }
         else if(this.loginName==data['secondGamerId'] && data['whoNext'].toString()=="2" && this.gameReady==true){
          if( data['whoWon'].toString()=="1"){
            this.gameOver=true;
            this.whoWonGame=data['firstGamerId']
         return  clearInterval(this.passToOpponent);
          }
           else if(data['whoWon'].toString()=="2"){
            this.gameOver=true;
            this.whoWonGame=data['secondGamerId']
          return clearInterval(this.passToOpponent);
          }
           this.isDisabled=false;
           this.startTimer();
           this.numberGuessedForOponents.push({num:data['firstGamerGuess'].toString()})
          return clearInterval(this.passToOpponent);
         }

       }))



 }, 1000);




   }







 validate(guess:any) {
  if(this.isDisabled==true){
    return;
     }
   else if(this.isDisabled==false){
  clearTimeout(this.timeIsUp);
  this.isDisabled=true;

  if(isNaN(Number(guess)) || guess==null || guess==""){
 //  this.numberGuessedForMine.push({num:guess, posneg:"Enter only digit"});
  guess = "0";

 }

   if (guess) {
    this.api.getRoomDetails(this.roomId).pipe(first()).subscribe(data =>{
    var validate = this.validation.returnResult(this.setNumToMe, guess);
     if(validate.toString()=="+++++"){
       this.gameOver=true;
       this.whoWonGame=this.loginName;
       if(this.loginName== data['firstGamerId']){
       this.whoWonGamePOST="1";
       this.scoreApi.getOneUserScore(this.loginName.toString()).subscribe(scoredata => {
        this.oldScore = scoredata['score'].toString();
        this.scoreApi.updateAnUserScore(this.loginName, 100+Number(this.oldScore)).subscribe(data => data);
        });
      }
       else if(this.loginName== data['secondGamerId']){
       this.whoWonGamePOST="2";
       this.scoreApi.getOneUserScore(this.loginName.toString()).subscribe(scoredata => {
        this.oldScore = scoredata['score'].toString();
        this.scoreApi.updateAnUserScore(this.loginName, 100+Number(this.oldScore)).subscribe(data => data);
        });
      }
     }
     var lastIndexOfOppGuessed= this.numberGuessedForOponents[this.numberGuessedForOponents.length-1].num;
     if(this.loginName== data['firstGamerId']){
       console.log("Hello");
       this.ngOnInit();
       if(guess.length!=5 || validate.toString().length>5){
         this.numberGuessedForMine.push({num:"Enter 5 unique digits!", posneg:null});
         return this.api.updateRoom(data['roomId'],data['firstGamerId'], data['secondGamerId'], this.setNumToMe,this.setNumToOpponent,"Not valid!",lastIndexOfOppGuessed,"2",this.whoWonGamePOST, "0").subscribe((data)=>data);
       }
     else if(guess.length==5) {
       this.numberGuessedForMine.push({num:guess, posneg:validate.toString()});
       return this.api.updateRoom(data['roomId'],data['firstGamerId'], data['secondGamerId'], this.setNumToMe,this.setNumToOpponent,guess,lastIndexOfOppGuessed,"2",this.whoWonGamePOST, "0").subscribe((data)=>data);
     }
   }
     else if(this.loginName== data['secondGamerId']){
       console.log("Mello");
       this.ngOnInit();
       if(guess.length!=5 || validate.toString().length>5){
         this.numberGuessedForMine.push({num:"Enter 5 unique digits!", posneg:null});
         return this.api.updateRoom(data['roomId'],data['firstGamerId'], data['secondGamerId'], this.setNumToOpponent,this.setNumToMe,lastIndexOfOppGuessed,"Not valid!","1",this.whoWonGamePOST, "0").subscribe((validate)=>data);
       }
       else if(guess.length==5) {
         this.numberGuessedForMine.push({num:guess, posneg:validate.toString()});
         return this.api.updateRoom(data['roomId'],data['firstGamerId'], data['secondGamerId'], this.setNumToOpponent,this.setNumToMe,lastIndexOfOppGuessed,guess,"1",this.whoWonGamePOST, "0").subscribe((validate)=>data);

       }
 }

})

}

  }

   }

     setAnumber(num:any){
       if((Number(num))>0){
         var i=0;
         var k=0;
        var numS=num+"";
        if(Number(num)<10000){
          this.isMessageShow=true;
          return this.isValid=true
        }
        for(i=0; i <numS.length; i++){
         for(k=0; k <numS.length; k++){
          if(numS.charAt(i)==numS.charAt(k) && i!=k){
           this.isMessageShow=true;
            return this.isValid=true;
          }
         }

        }
        this.isValid=false;
        this.setNumToOpponent=num;
        this.userReady='1';
       }
       else{
         this.isMessageShow=true;
         this.isValid=true;
       }


         this.api.updateGamer(this.loginName,"12345",num,this.userReady).subscribe((data)=>data);

     }

     playAgain(){
      this.newGameClicked=true;
     var timeOut =  setTimeout(()=>{
      this.api.getRoomDetails(this.roomId).pipe(first()).subscribe(data =>{
       this.api.updateGamer(this.loginName,"12345","12345","0").subscribe((data)=>data);
       this.api.updateRoom(data['roomId'], data['firstGamerId'], data['secondGamerId'], "12345","12345","12345","12345","1","3", "0").subscribe((data)=>data);
       // this.router.navigateByUrl("/gameRoom/"+"12345");
       this.numberGuessedForMine = [];
       this.numberGuessedForOponents = [];
       this.setNumToOpponent="";
       this.setNumToMe="";
       this.isValid=true;
       this.isMessageShow=false;
       this.oponentName="";
       this.isClick=false;
       this.gameReady=false;
       this.userReady="";
       this.gameOver=false;
       this.whoWonGame="";
       this.whoWonGamePOST="3"
       this.me="0";
       this.opp="0";
       clearInterval(this.passToOpponent);
       clearInterval(this.gameStarter);
       clearTimeout(this.timeIsUp);
       this.ngOnInit();

      })

      },2000)

     }


   validateTimeIsUp(guess: string) {
     if(this.isDisabled==true){
      return;
       }
     else if(this.isDisabled==false){
    clearTimeout(this.timeIsUp);
   this.isDisabled=true;

   if (guess) {
    this.api.getRoomDetails(this.roomId).pipe(first()).subscribe(data =>{
     this.numberGuessedForMine.push({num:guess, posneg:""});
     var lastIndexOfOppGuessed= this.numberGuessedForOponents[this.numberGuessedForOponents.length-1].num;
     if(this.loginName==data['firstGamerId']){
      //  console.log("Hello");
       this.api.updateRoom(data['roomId'], data['firstGamerId'], data['secondGamerId'], this.setNumToMe,this.setNumToOpponent,guess,lastIndexOfOppGuessed,"2","3", "0").subscribe((data)=>data);
       return this.ngOnInit();


   }
     else if(this.loginName==data['secondGamerId']){
      //  console.log("Mello");
       this.api.updateRoom(data['roomId'], data['firstGamerId'], data['secondGamerId'], this.setNumToOpponent,this.setNumToMe,lastIndexOfOppGuessed,guess,"1","3", "0").subscribe((data)=>data);
      return this.ngOnInit();


 }
})
     }
}

   }


 startTimer(){


   if(this.isDisabled==false && this.gameReady==true){
      this.timeIsUp = setTimeout(()=>{
       if(this.isDisabled==true){
       return  clearTimeout(this.timeIsUp)
       }
      else{
     this.validateTimeIsUp("Time is up!");
    return clearTimeout(this.timeIsUp);


       }
     },60000)
     return;
     }


   }








 }
