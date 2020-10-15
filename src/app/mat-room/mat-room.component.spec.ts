import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatRoomComponent } from './mat-room.component';

describe('MatRoomComponent', () => {
  let component: MatRoomComponent;
  let fixture: ComponentFixture<MatRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
