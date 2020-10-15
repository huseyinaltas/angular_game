import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { loginInfo } from './loginInfo';
import { whichGame } from './loginInfo';
import { GameRoomOppComponent } from './game-room-opp/game-room-opp.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'game-number';
  gamerName:string="huso";



  constructor(private router: Router, private gamerRoomOpp: GameRoomOppComponent) {}

  ngOnInit() {
    this.gamerName=loginInfo[0];


  }

  logout(){
    loginInfo[0]=null;
    whichGame[0]=null;
    this.ngOnInit();

  }


}
