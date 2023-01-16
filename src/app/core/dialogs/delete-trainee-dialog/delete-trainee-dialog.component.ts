import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-trainee-dialog',
  templateUrl: './delete-trainee-dialog.component.html',
  styleUrls: ['./delete-trainee-dialog.component.scss']
})
export class DeleteTraineeDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeleteTraineeDialogComponent>) { }

  

}
