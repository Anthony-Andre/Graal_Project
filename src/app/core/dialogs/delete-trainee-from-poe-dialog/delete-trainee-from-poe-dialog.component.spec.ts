import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTraineeFromPoeDialogComponent } from './delete-trainee-from-poe-dialog.component';

describe('DeleteTraineeFromPoeDialogComponent', () => {
  let component: DeleteTraineeFromPoeDialogComponent;
  let fixture: ComponentFixture<DeleteTraineeFromPoeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTraineeFromPoeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTraineeFromPoeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
