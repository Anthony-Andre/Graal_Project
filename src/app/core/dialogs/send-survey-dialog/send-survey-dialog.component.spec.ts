import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSurveyDialogComponent } from './send-survey-dialog.component';

describe('SendSurveyDialogComponent', () => {
  let component: SendSurveyDialogComponent;
  let fixture: ComponentFixture<SendSurveyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendSurveyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSurveyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
