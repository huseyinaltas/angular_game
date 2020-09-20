import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'game-number';



  constructor(private router: Router) {}

  ngOnInit() {
    // do init at here for current route.


  //   setTimeout(() => {
  //     setTimeout(() => {
  //       this.router.navigateByUrl("/home");
  //     });
  //   }, 0);
  }
}
