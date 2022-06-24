import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhosgoingComponent } from './whosgoing.component';

describe('WhosgoingComponent', () => {
  let component: WhosgoingComponent;
  let fixture: ComponentFixture<WhosgoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhosgoingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhosgoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
