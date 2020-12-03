import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(public router:Router, public cookie:CookieService) { }

  ngOnInit(): void {
    this.cookie.set("url", this.router.url.substring(1))
  }

}
