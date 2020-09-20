import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameRoomComponent } from './game-room/game-room.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CountdownModule } from 'ngx-countdown';



@NgModule({
  declarations: [
    AppComponent,
    GameRoomComponent,
    AboutUsComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CountdownModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: 'gameRoom/:room', component: GameRoomComponent },
        { path: 'aboutUs', component: AboutUsComponent },
        { path: 'home', component: HomeComponent },
        { path: 'login', component: LoginComponent },


      ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
