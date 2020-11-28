import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../api.services/game.room.service';
import { loginInfo } from '../loginInfo';
import { room } from '../loginInfo';



@Component({
  selector: 'app-wait-room',
  templateUrl: './wait-room.component.html',
  styleUrls: ['./wait-room.component.css']
})
export class WaitRoomComponent implements OnInit {
  roomId;
  opp;
  myid;
  gameReady;
  href;
  status = 'ONLINE';
  isConnected = true;

  constructor(private api: GameService, private router: Router) { }


  ngOnInit(): void {
    this.myid = loginInfo[0];
    this.href =  this.router.url;
    this.api.delete5Minutes().subscribe((data) => data);
    this.api.updateGamer(this.myid,"12345","",3).subscribe((data)=>data);
    this.api.getAvailableRooms().subscribe((data) => {

      try {
        if(data[0].roomId){
          room[0] = data[0].roomId;
          this.roomId = data[0].roomId;
          this.opp= data[0].firstGamerId;
          if(this.myid != this.opp){
          this.api.updateRoom(this.roomId,this.opp,this.myid,null,null,"","","1","3", "0").subscribe(data => data);
          this.router.navigateByUrl("/room-opp/"+this.roomId);
          }
          else if(this.myid == this.opp){
          this.api.deleteARoom(this.roomId).subscribe(data => data);
          clearInterval(this.gameReady);
          this.ngOnInit();
          }
          }

      } catch (error) {
        if(loginInfo[0] != null){
        var count=0;
        this.roomId = this.api.createId(10);
        room[0]=this.roomId;
        this.api.createRoom(this.roomId,this.myid,null,null,null,"","","1","3", "0").subscribe(data => data);
        this.gameReady = setInterval(()=>{
          if(count >=60){
          this.api.deleteARoom(this.roomId).subscribe(data => data);
          this.router.navigateByUrl("/home");
          console.log("Wait room")
          clearInterval(this.gameReady)

          }
          if(this.href !=  this.router.url && this.router.url != "/room-opp/"+this.roomId || this.status == "OFFLINE"){
          this.api.deleteARoom(this.roomId).subscribe(data => data);
          clearInterval(this.gameReady)
          }

        this.api.getRoomDetails(this.roomId).subscribe(data =>{
       try {
        if(data['secondGamerId'] != null){
          this.api.updateRoom(this.roomId,this.myid,data['secondGamerId'],null,null,"","","1","3","0").subscribe(data => data);
          this.router.navigateByUrl("/room-opp/"+this.roomId);
          clearInterval(this.gameReady);
          }
       } catch (error) {

       }
        })
        count++
    }, 1000);
  }
      }

    })


  }







}
