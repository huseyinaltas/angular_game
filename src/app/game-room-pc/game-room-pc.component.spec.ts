import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomPcComponent } from './game-room-pc.component';

describe('GameRoomPcComponent', () => {
  let component: GameRoomPcComponent;
  let fixture: ComponentFixture<GameRoomPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRoomPcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRoomPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
