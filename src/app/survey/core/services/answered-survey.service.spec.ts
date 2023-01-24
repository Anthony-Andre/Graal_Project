import { TestBed } from '@angular/core/testing';

import { AnsweredSurveyService } from './answered-survey.service';

describe('AnsweredSurveyService', () => {
  let service: AnsweredSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnsweredSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
