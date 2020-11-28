import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { loginInfo } from '../loginInfo';


@Injectable({ providedIn: 'root' })
export class ScoreService {
  loginName ="";
  oldScore="";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loginName = loginInfo[0];

  }

   headers =  new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
},
);




  getAllScores() {
    return this.http.request('GET', 'http://192.168.86.98:8080/scoreTen', {headers:this.headers,responseType:'json'});
  }


  getOneUserScore(email:string){

    return this.http.request('GET', 'http://192.168.86.98:8080/score/'+email, {headers:this.headers,responseType:'json'});
  }


  updateAnUserScore(email, score){

   const body = {
    gamerEmail: email,
    score: score
  }


   return this.http.request('PUT', 'http://192.168.86.98:8080/score/'+email, { headers:this.headers, body:body, responseType:'json'});


  }
  updateAnUsername(email, userName){

   const body = {
    gamerEmail: email,
    gamerid: userName
  }


   return this.http.request('PUT', 'http://192.168.86.98:8080/score/username/'+email, { headers:this.headers, body:body, responseType:'json'});


  }

  createAnUser(email, userid){
    const body = {
      gamerEmail: email,
      gamerid: userid,
      score: "0"
    }
    return this.http.request('POST', 'http://192.168.86.98:8080/score/', { headers:this.headers, body:body, responseType:'json'});

  }



}
