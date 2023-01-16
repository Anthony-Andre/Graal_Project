import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clear-trainees-from-poe-dialog',
  templateUrl: './clear-trainees-from-poe-dialog.component.html',
  styleUrls: ['./clear-trainees-from-poe-dialog.component.scss']
})
export class ClearTraineesFromPoeDialogComponent {

  constructor(private dialogRef: MatDialogRef<ClearTraineesFromPoeDialogComponent>) { }


}
