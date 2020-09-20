import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { loginInfo } from '../loginInfo';


@Injectable({ providedIn: 'root' })
export class GameService {
  loginName ="";
  data;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loginName = loginInfo[0];
    console.log('login name: ' + this.loginName);

  }

   headers =  new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
},
);




  getRoomDetails() {
    return this.http.request('GET', 'http://192.168.86.98:8080/gameroom/12345', {headers:this.headers,responseType:'json'});
  }


  updateRoom(roomId,firstGamerId,secondGamerId,firstGamerNumberSetNum,secondGamerNumberSetNum,firstGamerGuess,secondGamerGuess, 
  whoNext, whoWon){
   var bodyl = {
      roomId : roomId ,
  firstGamerId : firstGamerId,
  secondGamerId : secondGamerId,
  firstGamerNumberSetNum : firstGamerNumberSetNum,
  secondGamerNumberSetNum : secondGamerNumberSetNum,
      firstGamerGuess: firstGamerGuess,
      secondGamerGuess: secondGamerGuess,
      whoNext:whoNext,
      whoWon:whoWon
  }
    return  this.http.request('PUT', 'http://192.168.86.98:8080/gameroom/12345', { headers:this.headers, body:bodyl});
  }

  validateNum(setNumToMe, guess){

   const body = {setNum:setNumToMe+"",};

   const params = new HttpParams({fromString: 'guessNum='+guess});

   return this.http.request('POST', 'http://192.168.86.98:8080/guess', {responseType:'text', headers:this.headers, params:params, body:body})
  }



  updateGamer( gamerid, gameroom,setnumto, ready){

   const body = { gamerid: gamerid,
                  gameroom: gameroom,
                  setnumto: setnumto,
                  ready: ready};

   return this.http.request('PUT', 'http://192.168.86.98:8080/gamer/'+gamerid, {responseType:'text', headers:this.headers, body:body})
  }


  getGamerDetails(gamerid:string) {
    return this.http.request('GET', 'http://192.168.86.98:8080/gamer/'+gamerid, {headers:this.headers,responseType:'json'});
  }


}
