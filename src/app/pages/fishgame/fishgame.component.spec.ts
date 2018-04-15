import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishgameComponent } from './fishgame.component';

describe('FishgameComponent', () => {
  let component: FishgameComponent;
  let fixture: ComponentFixture<FishgameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishgameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
