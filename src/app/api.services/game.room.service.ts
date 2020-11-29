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




  getRoomDetails(roomId) {
    // return this.http.request('GET', 'http://192.168.86.98:8080/gameroom/'+roomId, {headers:this.headers,responseType:'json'});
    return this.http.request('GET', 'https://find-number-spring.herokuapp.com/gameroom/'+roomId, {headers:this.headers,responseType:'json'});
  }


  updateRoom(roomId,firstGamerId,secondGamerId,firstGamerNumberSetNum,secondGamerNumberSetNum,firstGamerGuess,secondGamerGuess,
  whoNext, whoWon, friend){
   var bodyl = {
      roomId : roomId ,
  firstGamerId : firstGamerId,
  secondGamerId : secondGamerId,
  firstGamerNumberSetNum : firstGamerNumberSetNum,
  secondGamerNumberSetNum : secondGamerNumberSetNum,
      firstGamerGuess: firstGamerGuess,
      secondGamerGuess: secondGamerGuess,
      whoNext:whoNext,
      whoWon:whoWon,
      friend:friend
  }
    // return  this.http.request('PUT', 'http://192.168.86.98:8080/gameroom/'+roomId, { headers:this.headers, body:bodyl});
    return  this.http.request('PUT', 'https://find-number-spring.herokuapp.com/gameroom/'+roomId, { headers:this.headers, body:bodyl});
  }

  validateNum(setNumToMe, guess){

   const body = {setNum:setNumToMe+"",};

   const params = new HttpParams({fromString: 'guessNum='+guess});

  //  return this.http.request('POST', 'http://192.168.86.98:8080/guess', {responseType:'text', headers:this.headers, params:params, body:body})
   return this.http.request('POST', 'https://find-number-spring.herokuapp.com/guess', {responseType:'text', headers:this.headers, params:params, body:body})
  }



  updateGamer( gamerid, gameroom,setnumto, ready){

   const body = { gamerid: gamerid,
                  gameroom: gameroom,
                  setnumto: setnumto,
                  ready: ready};

  //  return this.http.request('PUT', 'http://192.168.86.98:8080/gamer/'+gamerid, {responseType:'text', headers:this.headers, body:body})
   return this.http.request('PUT', 'https://find-number-spring.herokuapp.com/gamer/'+gamerid, {responseType:'text', headers:this.headers, body:body})
  }


  getGamerDetails(gamerid:string) {
    // return this.http.request('GET', 'http://192.168.86.98:8080/gamer/'+gamerid, {headers:this.headers,responseType:'json'});
    return this.http.request('GET', 'https://find-number-spring.herokuapp.com/gamer/'+gamerid, {headers:this.headers,responseType:'json'});
  }



  getAvailableRooms() {
    // return this.http.request('GET', 'http://192.168.86.98:8080/available/', {headers:this.headers,responseType:'json'});
    return this.http.request('GET', 'https://find-number-spring.herokuapp.com/available/', {headers:this.headers,responseType:'json'});
  }


  createRoom(roomId,firstGamerId,secondGamerId,firstGamerNumberSetNum,secondGamerNumberSetNum,firstGamerGuess,secondGamerGuess,
    whoNext, whoWon, friend){
     var bodyl = {
        roomId : roomId ,
    firstGamerId : firstGamerId,
    secondGamerId : secondGamerId,
    firstGamerNumberSetNum : firstGamerNumberSetNum,
    secondGamerNumberSetNum : secondGamerNumberSetNum,
        firstGamerGuess: firstGamerGuess,
        secondGamerGuess: secondGamerGuess,
        whoNext:whoNext,
        whoWon:whoWon,
        friend:friend
    }
      // return  this.http.request('POST', 'http://192.168.86.98:8080/gameroom/', {responseType:'text', headers:this.headers, body:bodyl});
      return  this.http.request('POST', 'https://find-number-spring.herokuapp.com/gameroom/', {responseType:'text', headers:this.headers, body:bodyl});
    }


    createId(length){
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;

    }

    createIdFriend(length){
        var result           = '';
        var characters       = '0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;

    }

    deleteARoom(roomId) {
      // return this.http.request('DELETE', 'http://192.168.86.98:8080/gameroom/'+roomId, {responseType:'text', headers:this.headers,});
      return this.http.request('DELETE', 'https://find-number-spring.herokuapp.com/gameroom/'+roomId, {responseType:'text', headers:this.headers,});
    }


    delete5Minutes() {
      // return this.http.request('DELETE', 'http://192.168.86.98:8080/gameroom/deleteFiveMinutes/', {responseType:'text', headers:this.headers,});
      return this.http.request('DELETE', 'https://find-number-spring.herokuapp.com/gameroom/deleteFiveMinutes/', {responseType:'text', headers:this.headers,});
    }




}
