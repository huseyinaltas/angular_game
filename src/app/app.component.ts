import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { loginInfo } from './loginInfo';
import { whichGame } from './loginInfo';
import { GameRoomOppComponent } from './game-room-opp/game-room-opp.component';
import { AuthService } from '@auth0/auth0-angular';
import { AuthServ } from './auth.service';
import { ScoreService } from './api.services/gamer.score.service';
import { getMaxListeners } from 'process';
import { CookieService } from 'ngx-cookie-service';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  gamerName="";
  title = 'Find A Number';
  isAuthenticated = false;
  picture;
  email;
  emailInDB;
  register = false;
  errorMessage="";
  token;
  profileJson;
  playShow = true;
  user;





  constructor(public router: Router, private gamerRoomOpp: GameRoomOppComponent,
    public authService: AuthServ, public auth: AuthService,
     private api: ScoreService, public cookie: CookieService) {
    this.auth.isAuthenticated$.subscribe(data => this.isAuthenticated = data);
    this.picture = this.auth.user$.subscribe(data => {
      this.picture = data.picture;
      this.email = data.email;
      this.user = data.email;


    });


  }

  // ngOnInit() {
  //   this.gamerName=loginInfo[0];


  // }

  // logout(){
  //   loginInfo[0]=null;
  //   whichGame[0]=null;
  //   this.ngOnInit();

  // }

   ngOnInit() {
    this.picture = this.auth.user$.subscribe(data => {
      this.emailInDB = data.email+"_"+data.sub.charAt(0);
        this.api.getOneUserScore(this.emailInDB).subscribe(score => {
          try {
          loginInfo[0] = score['gamerid'];
          this.gamerName = loginInfo[0];
        } catch (error) {
          this.register = true;
          this.playShow =false;
        }
        });


    });

    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );

    setTimeout(() => {
      var elementExists = document.getElementsByClassName('nello');
      this.auth.isAuthenticated$.subscribe(data => {
        if(!data && this.cookie.get("auth0.is.authenticated")=="true"){
          this.login();
        }
        else if(!data && this.cookie.get("auth0.is.authenticated")!="true"){
          if(this.router.url == "/")
          this.router.navigateByUrl("/home")
        }
        else if(data){
          this.router.navigateByUrl(this.cookie.get("url"))
        }
        else if(elementExists.length ==1){
          this.router.navigateByUrl(this.cookie.get("url"))
        }
      })

    }, 500);


    // if(elementExists,,){
    //   this.router.navigateByUrl("/home")

    // }

  }

  logout() {
    this.authService.logout();
  }
  login() {
    this.auth.loginWithRedirect();
  }

  userName(user:string){
    this.picture = this.auth.user$.subscribe(data => {
      this.emailInDB = data.email+"_"+data.sub.charAt(0);
      console.log(this.emailInDB);
      // this.api.getOneUserScore(this.email).subscribe(data => {
      //   if(data['gamerid']==user){
      //     return this.errorMessage = "Exist, enter different User Name";
      //   }
      // })
      this.api.createAnUser(this.emailInDB, user).subscribe(data =>{
       this.errorMessage =  data["message"];
      if(this.errorMessage.includes("added")){
         this.register = false;
        this.router.navigateByUrl("/home");
       return location.reload();
      }
      else{
         return;

      }
      });
    });

  }

  openNewTap(link){
    window.open(link);
  }




}
