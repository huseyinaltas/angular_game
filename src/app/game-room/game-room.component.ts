// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, throwError } from 'rxjs';
// import { catchError, first, retry, take } from 'rxjs/operators';
// import { isNumber, isString } from 'util';
// import { LoginComponent } from '../login/login.component';
// import { GameService } from '../api.services/game.room.service';
// import { loginInfo } from '../loginInfo';
// import { interval } from 'rxjs';
// import { MethodCall } from '@angular/compiler';
// import { CountdownModule } from 'ngx-countdown';




// @Component({
//   selector: 'app-game-room',
//   templateUrl: './game-room.component.html',
//   styleUrls: ['./game-room.component.css']
// })
// export class GameRoomComponent implements OnInit {
//   @ViewChild('countdown', { static: false }) private counter: CountdownModule;
//  numberGuessedForMine = [];
//  numberGuessedForOponents = [];
//  loginName ="";
//  gamer="Ozge";
//  setNumToOpponent="";
//  setNumToMe="";
//  isValid=true;
//  isMessageShow=false;
//  messageForSetNum="Please enter 5 unique digits like 12345";
//  oponentName="";
//  isClick=false;
//  isDisabled;
//  myinterval;
//  gameReady=false;
//  userReady="";
//   me;
//  opp;
//  gameStarter;
//  gameOver=false;
//  whoWonGame="";
//  whoWonGamePOST="3"
// gameOverInterval;






//  constructor(private http: HttpClient, private router: Router, private api: GameService) { }

//   ngOnInit() {


//     this.loginName=loginInfo[0];


//     this.api.getRoomDetails().subscribe(
//   data => {
//     if(this.loginName === 'huso25'){
//       this.oponentName = data['secondGamerId'].toString();

//     }
//     else if(this.loginName === 'ozge01'){
//       this.oponentName=data['firstGamerId'].toString();
//     }

//   }
// );

// this.gameStarter = setInterval(()=>{
//   if(this.loginName=="huso25"){
//     this.api.getGamerDetails("ozge01").subscribe(data => this.setNumToMe=data['setnumto'].toString());

//   }

//   else if(this.loginName=="ozge01"){
//     this.api.getGamerDetails("huso25").subscribe(data => this.setNumToMe=data['setnumto'].toString());
//   }

//   this.api.getGamerDetails("ozge01").pipe(first()).subscribe(data => this.me=data['ready'].toString());
//   this.api.getGamerDetails("huso25").pipe(first()).subscribe(data => this.opp=data['ready'].toString());

//   console.log(this.me + "  "+this.opp);

//   if(this.me=="1" && this.opp=="1"){
//     this.gameReady=true;
//     clearInterval(this.gameStarter);


//   }

// }, 1000);




//  var passToOpponent = setInterval(()=>{
//   this.api.getRoomDetails().pipe(first()).subscribe((data =>{
//        if( data['whoWon'].toString()=="1"){
//           console.log("huso25");
//           this.gameOver=true;
//           this.whoWonGame="huso25"
//          clearInterval(passToOpponent);
//         }
//          else if(data['whoWon'].toString()=="2"){
//             console.log("ozge01");
//           this.gameOver=true;
//           this.whoWonGame="ozge01"
//          clearInterval(passToOpponent);
//         }

//       else if(this.loginName=='huso25' && data['whoNext'].toString()=="1" && this.gameReady==true){
//             this.isDisabled=false;
//             this.startTimer();
//             this.numberGuessedForOponents.push({num:data['secondGamerGuess'].toString()});
//           return clearInterval(passToOpponent);
//         }
//        else if(this.loginName=='huso25' && data['whoNext'].toString()=="2"){
//            this.isDisabled=true;


//         }
//         else if(this.loginName=='ozge01' && data['whoNext'].toString()=="1"){
//           this.isDisabled=true;


//         }
//         else if(this.loginName=='ozge01' && data['whoNext'].toString()=="2" && this.gameReady==true){
//           this.isDisabled=false;
//           this.startTimer();
//           this.numberGuessedForOponents.push({num:data['firstGamerGuess'].toString()})
//          return clearInterval(passToOpponent);
//         }

//       }))


// }, 1000);





//   }







// validate(guess: string) {

//   this.isDisabled=true;

//  if(isNaN(Number(guess)) || guess==null || guess==""){
// //  this.numberGuessedForMine.push({num:guess, posneg:"Enter only digit"});
//  guess = "0";

// }

//   if (guess) {
//     this.api.validateNum(this.setNumToMe,guess).subscribe(data => {
//     if(data.toString()=="+++++"){
//       this.gameOver=true;
//       this.whoWonGame=this.loginName;
//       if(this.loginName=="huso25"){
//       this.whoWonGamePOST="1";}
//       else if(this.loginName=="ozge01"){
//       this.whoWonGamePOST="2";}
//     }
//     var lastIndexOfOppGuessed= this.numberGuessedForOponents[this.numberGuessedForOponents.length-1].num;
//     if(this.loginName=="huso25"){
//       console.log("Hello");
//       this.ngOnInit();
//       if(guess.length!=5 || data.toString().length>5){
//         this.numberGuessedForMine.push({num:"Enter 5 unique digits!", posneg:null});
//         return this.api.updateRoom("12345","huso25", "ozge01", this.setNumToMe,this.setNumToOpponent,"Not valid!",lastIndexOfOppGuessed,"2",this.whoWonGamePOST).subscribe(()=>data);
//       }
//     else if(guess.length==5) {
//       this.numberGuessedForMine.push({num:guess, posneg:data.toString()});
//       return this.api.updateRoom("12345","huso25", "ozge01", this.setNumToMe,this.setNumToOpponent,guess,lastIndexOfOppGuessed,"2",this.whoWonGamePOST).subscribe(()=>data);
//     }
//   }
//     else if(this.loginName=="ozge01"){
//       console.log("Mello");
//       this.ngOnInit();
//       if(guess.length!=5 || data.toString().length>5){
//         this.numberGuessedForMine.push({num:"Enter 5 unique digits!", posneg:null});
//         return this.api.updateRoom("12345","huso25", "ozge01", this.setNumToOpponent,this.setNumToMe,lastIndexOfOppGuessed,"Not valid!","1",this.whoWonGamePOST).subscribe(()=>data);
//       }
//       else if(guess.length==5) {
//         this.numberGuessedForMine.push({num:guess, posneg:data.toString()});
//         return this.api.updateRoom("12345","huso25", "ozge01", this.setNumToOpponent,this.setNumToMe,lastIndexOfOppGuessed,guess,"1",this.whoWonGamePOST).subscribe(()=>data);

//       }
// }
//     }
//     )
//   }

//   }

//     setAnumber(num:any){
//       if((Number(num))>0){
//         var i=0;
//         var k=0;
//        var numS=num+"";
//        if(Number(num)<10000){
//          this.isMessageShow=true;
//          return this.isValid=true
//        }
//        for(i=0; i <numS.length; i++){
//         for(k=0; k <numS.length; k++){
//          if(numS.charAt(i)==numS.charAt(k) && i!=k){
//           this.isMessageShow=true;
//            return this.isValid=true;
//          }
//         }

//        }
//        this.isValid=false;
//        this.setNumToOpponent=num;
//        this.userReady='1';
//       }
//       else{
//         this.isMessageShow=true;
//         this.isValid=true;
//       }


//         this.api.updateGamer(this.loginName,"12345",num,this.userReady).subscribe((data)=>data);

//     }

//     playAgain(){
//       this.api.updateGamer(this.loginName,"12345","12345","0").subscribe((data)=>data);
//       this.api.updateRoom("12345","huso25", "ozge01", "12345","12345","12345","12345","1","3").subscribe((data)=>data);
//       // this.router.navigateByUrl("/gameRoom/"+"12345");
//       this.numberGuessedForMine = [];
//       this.numberGuessedForOponents = [];
//       this.setNumToOpponent="";
//       this.setNumToMe="";
//       this.isValid=true;
//       this.isMessageShow=false;
//       this.oponentName="";
//       this.isClick=false;
//       this.gameReady=false;
//       this.userReady="";
//       this.gameOver=false;
//       this.whoWonGame="";
//       this.whoWonGamePOST="3"
//       this.me="0";
//       this.opp="0";
//       this.ngOnInit();


//     }


//   validateTimeIsUp(guess: string) {

//   this.isDisabled=true;

//   if (guess) {
//     this.numberGuessedForMine.push({num:guess, posneg:""});
//     var lastIndexOfOppGuessed= this.numberGuessedForOponents[this.numberGuessedForOponents.length-1].num;
//     if(this.loginName=="huso25"){
//       console.log("Hello");
//       this.api.updateRoom("12345","huso25", "ozge01", this.setNumToMe,this.setNumToOpponent,guess,lastIndexOfOppGuessed,"2","3").subscribe((data)=>data);
//       return this.ngOnInit();


//   }
//     else if(this.loginName=="ozge01"){
//       console.log("Mello");
//       this.api.updateRoom("12345","huso25", "ozge01", this.setNumToOpponent,this.setNumToMe,lastIndexOfOppGuessed,guess,"1","3").subscribe((data)=>data);
//      return this.ngOnInit();


// }
//     }
//   }


// startTimer(){


//   if(this.isDisabled==false && this.gameReady==true){
//     var i=0;
//     var timeIsUp = setInterval(()=>{
//       i++;
//       if(this.isDisabled==true){
//         clearInterval(timeIsUp)
//       }
//      else if(i==60){
//     this.validateTimeIsUp("Time is up!")
//     clearInterval(timeIsUp)
//       }
//     },1000)
//     return;
//     }


//   }





// }
