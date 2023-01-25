import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireAnswersDetailsComponent } from './stagiaire-answers-details.component';

describe('StagiaireAnswersDetailsComponent', () => {
  let component: StagiaireAnswersDetailsComponent;
  let fixture: ComponentFixture<StagiaireAnswersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagiaireAnswersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireAnswersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
