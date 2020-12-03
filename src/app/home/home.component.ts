import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginInfo } from '../loginInfo';
import { whichGame } from '../loginInfo';
import { GameRoomOppComponent } from '../game-room-opp/game-room-opp.component';
import { CookieService } from 'ngx-cookie-service';
import { GameService } from '../api.services/game.room.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginName;


  constructor(private router: Router, private gameRoomOpp: GameRoomOppComponent,
    public cookie: CookieService, private api: GameService,) { }

  ngOnInit() {
    this.api.delete1DayGamer().subscribe(data => data);
    this.cookie.set("url", this.router.url.substring(1))

  }


  isLoggedPC(){
    if(loginInfo[0] != null ){
      this.router.navigateByUrl("/room-pc");

    }
    else{
      this.router.navigateByUrl("/login");
      whichGame[0]="pc";
      this.cookie.set("url", "room-pc")

    }

  }
  isLoggedRooms(){
    if(loginInfo[0] != null ){
      this.router.navigateByUrl("/rooms");

    }
    else{
      this.router.navigateByUrl("/login");
      whichGame[0]="rooms";
      this.cookie.set("url", "rooms")

    }

  }

  isLoggedOnline(){
    if(loginInfo[0] != null ){
      this.router.navigateByUrl("/wait");

    }
    else{
      this.router.navigateByUrl("/login");
      whichGame[0]="online";
      this.cookie.set("url", "wait")
    }

  }

}
