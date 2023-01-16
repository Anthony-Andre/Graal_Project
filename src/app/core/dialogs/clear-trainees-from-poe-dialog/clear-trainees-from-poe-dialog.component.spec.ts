import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearTraineesFromPoeDialogComponent } from './clear-trainees-from-poe-dialog.component';

describe('ClearTraineesFromPoeDialogComponent', () => {
  let component: ClearTraineesFromPoeDialogComponent;
  let fixture: ComponentFixture<ClearTraineesFromPoeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearTraineesFromPoeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearTraineesFromPoeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
