import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { loginInfo } from '../loginInfo';
import { whichGame } from '../loginInfo';

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


constructor(private router: Router, private http: HttpClient, private appcomp: AppComponent) {

}

  ngOnInit() {


  }
  getUser(login:string){
    this.userReady=true;
if(this.userReady==true && login.length>2){

  if(whichGame[0]=="pc"){
      this.router.navigateByUrl("/room-pc");
      loginInfo[0]=login;
    this.appcomp.ngOnInit();
  }
  else if(whichGame[0]=="online"){
    this.router.navigateByUrl("/room-opp/12345");
      loginInfo[0]=login;
    this.appcomp.ngOnInit();

  }
  else{
    this.router.navigateByUrl("/home");
      loginInfo[0]=login;
    this.appcomp.ngOnInit();
  }
    }

  }



}
