import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Survey } from 'src/app/survey/core/models/survey';
import { SurveyService } from 'src/app/survey/core/services/survey.service';

@Component({
  selector: 'app-send-survey-dialog',
  templateUrl: './send-survey-dialog.component.html',
  styleUrls: ['./send-survey-dialog.component.scss']
})
export class SendSurveyDialogComponent implements OnInit {

 
  allSurveys!: Array<Survey>;
  surveySelected!: Survey;
  surveyId!: number;


  constructor(
    private surveyService: SurveyService,
    private dialogRef: MatDialogRef<SendSurveyDialogComponent>
    ) { }
  
  ngOnInit(): void {
    this.surveyService.findAll().subscribe((surveys: Array<Survey>) => this.allSurveys = surveys);
  }

  addCreatedSurvey(): void {
    var surveyCreatedId = ((<HTMLInputElement>document.getElementById("addCreatedSurvey")).value);
    this.surveyService.findOne(parseInt(surveyCreatedId)).subscribe((survey: Survey) => {
      this.surveySelected = survey;
      this.surveyId = this.surveySelected.getId();
      console.log("L'utilisateur souhaite envoyer le questionnaire", this.surveySelected.getTitle());
      }
      );    
  }

  getSurveyTitle(): string {
    if (this.surveySelected !== undefined) {return this.surveySelected.getTitle();}
    return "";
  }

  
  



  

 

}
