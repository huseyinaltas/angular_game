import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-game',
  templateUrl: './about-game.component.html',
  styleUrls: ['./about-game.component.css']
})
export class AboutGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openNewTap(link){
    window.open(link);
  }

}
