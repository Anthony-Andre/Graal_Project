import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAnswerComponent } from './message-answer.component';

describe('MessageAnswerComponent', () => {
  let component: MessageAnswerComponent;
  let fixture: ComponentFixture<MessageAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
