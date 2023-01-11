import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoeDetailsComponent } from './poe-details.component';

describe('PoeDetailsComponent', () => {
  let component: PoeDetailsComponent;
  let fixture: ComponentFixture<PoeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
