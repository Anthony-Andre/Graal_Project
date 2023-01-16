import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-poe-dialog',
  templateUrl: './delete-poe-dialog.component.html',
  styleUrls: ['./delete-poe-dialog.component.scss']
})
export class DeletePoeDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeletePoeDialogComponent>) { }

  

}
