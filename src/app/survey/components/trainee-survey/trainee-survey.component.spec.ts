import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeSurveyComponent } from './trainee-survey.component';

describe('TraineeSurveyComponent', () => {
  let component: TraineeSurveyComponent;
  let fixture: ComponentFixture<TraineeSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
