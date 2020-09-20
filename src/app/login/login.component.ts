import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GameRoomComponent } from '../game-room/game-room.component';
import { loginInfo } from '../loginInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userReady=false;
loginError="";
room=12345;
checkoutForm;


constructor(private router: Router, private http: HttpClient) {

}

  ngOnInit() {


  }
  getUser(login:string){
    this.userReady=true;
if(this.userReady==true && login.length>2){
      this.router.navigateByUrl("/gameRoom/"+this.room);
    }
    loginInfo[0]=login;
  }



}
