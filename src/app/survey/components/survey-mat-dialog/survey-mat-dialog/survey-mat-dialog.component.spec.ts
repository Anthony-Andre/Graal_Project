import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMatDialogComponent } from './survey-mat-dialog.component';

describe('SurveyMatDialogComponent', () => {
  let component: SurveyMatDialogComponent;
  let fixture: ComponentFixture<SurveyMatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyMatDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
