import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTraineeDialogComponent } from './delete-trainee-dialog.component';

describe('DeleteTraineeDialogComponent', () => {
  let component: DeleteTraineeDialogComponent;
  let fixture: ComponentFixture<DeleteTraineeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTraineeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTraineeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
