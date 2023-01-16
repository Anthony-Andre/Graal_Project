import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-trainee-from-poe-dialog',
  templateUrl: './delete-trainee-from-poe-dialog.component.html',
  styleUrls: ['./delete-trainee-from-poe-dialog.component.scss']
})
export class DeleteTraineeFromPoeDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteTraineeFromPoeDialogComponent>) { }

}
