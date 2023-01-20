import { TestBed } from '@angular/core/testing';

import { TraineeSurveyFormService } from './trainee-survey-form.service';

describe('TraineeSurveyFormService', () => {
  let service: TraineeSurveyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraineeSurveyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
