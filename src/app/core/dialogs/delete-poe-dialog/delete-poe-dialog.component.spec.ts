import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePoeDialogComponent } from './delete-poe-dialog.component';

describe('DeletePoeDialogComponent', () => {
  let component: DeletePoeDialogComponent;
  let fixture: ComponentFixture<DeletePoeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePoeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePoeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
