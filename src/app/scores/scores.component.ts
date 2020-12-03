import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';
import { ScoreService } from '../api.services/gamer.score.service';
import {room} from '../loginInfo'

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  allScores;

  constructor(private http: HttpClient, private router: Router,
    public cookie:CookieService, private api: ScoreService) { }


  ngOnInit(): void {
    // this.allScores.push(this.api.getAllScores());
    this.api.getAllScores().subscribe(data => this.allScores=data
      )

      this.cookie.set("url", this.router.url.substring(1))

  }






}
