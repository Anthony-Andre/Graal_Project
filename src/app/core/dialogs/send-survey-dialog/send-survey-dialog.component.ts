import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Survey } from 'src/app/survey/core/models/survey';

@Component({
  selector: 'app-send-survey-dialog',
  templateUrl: './send-survey-dialog.component.html',
  styleUrls: ['./send-survey-dialog.component.scss']
})
export class SendSurveyDialogComponent implements OnInit {

  survey1: Survey = new Survey();
  allSurveys: Array<Survey> = [
    this.survey1
  ];

  constructor(private dialogRef: MatDialogRef<SendSurveyDialogComponent>) { }
  
  ngOnInit(): void {
    this.survey1.setId(3);
    this.survey1.setTitle("Test");
  }

  addSurvey(): void {
    console.log("L'utilisateur souhaite envoyer le questionnaire", this.survey1.getTitle());
  }

  addNewSurvey(): void {
    console.log("L'utilisateur souhaite ajouter un nouveau questionnaire");
  }

 

}
