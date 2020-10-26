import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginInfo } from '../loginInfo';
import { whichGame } from '../loginInfo';
import { GameRoomOppComponent } from '../game-room-opp/game-room-opp.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginName;


  constructor(private router: Router, private gameRoomOpp: GameRoomOppComponent) { }

  ngOnInit(): void {


  }


  isLoggedPC(){
    if(loginInfo[0] != null ){
      this.router.navigateByUrl("/room-pc");

    }
    else{
      this.router.navigateByUrl("/login");
      whichGame[0]="pc";

    }

  }
  isLoggedRooms(){
    if(loginInfo[0] != null ){
      this.router.navigateByUrl("/rooms");

    }
    else{
      this.router.navigateByUrl("/login");
      whichGame[0]="rooms";

    }

  }

  isLoggedOnline(){
    if(loginInfo[0] != null ){
      this.router.navigateByUrl("/wait");

    }
    else{
      this.router.navigateByUrl("/login");
      whichGame[0]="online";
    }

  }

}
