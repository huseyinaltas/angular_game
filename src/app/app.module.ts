import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { GameRoomComponent } from './game-room/game-room.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CountdownModule } from 'ngx-countdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRoomComponent } from './mat-room/mat-room.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { GameRoomPcComponent } from './game-room-pc/game-room-pc.component';
import { GameRoomOppComponent } from './game-room-opp/game-room-opp.component';
import { ScoresComponent } from './scores/scores.component';
import { ProfileComponent } from './profile/profile.component';
import { WaitRoomComponent } from './wait-room/wait-room.component';
import { RoomsComponent } from './rooms/rooms.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AuthModule } from '@auth0/auth0-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';








@NgModule({
  declarations: [
    AppComponent,
    // GameRoomComponent,
    AboutUsComponent,
    HomeComponent,
    LoginComponent,
    MatRoomComponent,
    GameRoomPcComponent,
    GameRoomOppComponent,
    ScoresComponent,
    ProfileComponent,
    WaitRoomComponent,
    RoomsComponent,


  ],

  imports: [
    BrowserModule,
    DragDropModule,
    CountdownModule,
    AppRoutingModule,
    MatExpansionModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    AuthModule.forRoot({
      domain: 'find-numbers.us.auth0.com',
      clientId: 'Dt7iTAETxCePeYHFaANoQI4TY0DBdCgb'
    }),
    RouterModule.forRoot([
        // { path: 'gameRoom/:room', component: GameRoomComponent },
        { path: 'aboutUs', component: AboutUsComponent },
        { path: 'home', component: HomeComponent },
        { path: 'login', component: LoginComponent },
        { path: 'room-pc', component: GameRoomPcComponent },
        { path: 'room-opp/:room', component: GameRoomOppComponent },
        { path: 'scores', component: ScoresComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'wait', component: WaitRoomComponent },
        { path: 'rooms', component: RoomsComponent },



      ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
