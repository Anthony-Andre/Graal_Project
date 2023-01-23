import { TestBed } from '@angular/core/testing';

import { TraineeSurveyResolver } from './trainee-survey.resolver';

describe('TraineeSurveyResolver', () => {
  let resolver: TraineeSurveyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TraineeSurveyResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
