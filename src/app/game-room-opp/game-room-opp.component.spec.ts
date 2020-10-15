import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomOppComponent } from './game-room-opp.component';

describe('GameRoomOppComponent', () => {
  let component: GameRoomOppComponent;
  let fixture: ComponentFixture<GameRoomOppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomOppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRoomOppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
