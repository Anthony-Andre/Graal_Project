import { TestBed } from '@angular/core/testing';

import { HasAnonymousGuard } from './has-anonymous.guard';

describe('HasAnonymousGuard', () => {
  let guard: HasAnonymousGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasAnonymousGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
