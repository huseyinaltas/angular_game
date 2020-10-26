import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../api.services/game.room.service';
import { loginInfo } from '../loginInfo';
import { room } from '../loginInfo';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  roomId;
  opp;
  myid;
  gameReady;
  href;
  isConnected = true;
  isRoomCreated = false;
  noGame = false;
  gameStarter;
  clickedJoin = false;

  constructor(private api: GameService, private router: Router) { }

  ngOnInit(): void {
    this.myid = loginInfo[0];
    this.href =  this.router.url;
    this.api.delete5Minutes().subscribe((data) => data);

  }


  getGame(login){
    login = login.toLowerCase();
    this.api.getRoomDetails(login).subscribe(data => {
    try{
      if(data['roomId']){
        room[0] = data['roomId'];
        this.roomId = data['roomId'];
        this.opp= data['firstGamerId'];
        this.api.updateRoom(this.roomId,this.opp,this.myid,null,null,"","","1","3", "1").subscribe(data => data);
        this.gameReady = true;
        this.router.navigateByUrl("/room-opp/"+this.roomId);

      }

    }
    catch(error){
      this.noGame = true;
      this.ngOnInit();
    }

    })

  }

  createGame(){
    var count;
    this.roomId = this.api.createIdFriend(5).toLowerCase();
    room[0] = this.roomId;
    this.api.createRoom(this.roomId,this.myid, null, null, null, "", "", "1", "3", "1").subscribe(data => data);
    this.isRoomCreated = true;
    this.gameStarter = setInterval(()=>{
      if(count >=300){
      this.api.deleteARoom(this.roomId).subscribe(data => data);
      this.router.navigateByUrl("/home");
      clearInterval(this.gameStarter)

      }
      // if(this.href !=  this.router.url && this.router.url != "/room-opp/"+this.roomId){
      // this.api.deleteARoom(this.roomId).subscribe(data => data);
      // clearInterval(this.gameStarter)
      // }

    this.api.getRoomDetails(this.roomId).subscribe(data =>{
   try {
    if(data['secondGamerId'] != null){
      this.api.updateRoom(this.roomId,this.myid,data['secondGamerId'],null,null,"","","1","3","0").subscribe(data => data);
      this.router.navigateByUrl("/room-opp/"+this.roomId);
      clearInterval(this.gameStarter);
      }
   } catch (error) {

   }
    })
    count++
}, 1000);
  }

}
