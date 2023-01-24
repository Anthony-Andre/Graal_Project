import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Survey } from 'src/app/survey/core/models/survey';
import { SurveyService } from 'src/app/survey/core/services/survey.service';
import { Level } from '../../enums/level';

@Component({
  selector: 'app-send-survey-dialog',
  templateUrl: './send-survey-dialog.component.html',
  styleUrls: ['./send-survey-dialog.component.scss']
})
export class SendSurveyDialogComponent implements OnInit {

 
  allSurveys: Array<Survey> = [];
  surveyId!: number;


  constructor(
    private surveyService: SurveyService,
    private dialogRef: MatDialogRef<SendSurveyDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
    ) { }
  
  ngOnInit(): void {
    this.surveyService.findAll().subscribe((surveys: Array<Survey>) => {
      this.allSurveys = surveys;
      
      if (this.data.stopDate === "oneMonth") {
        this.allSurveys = this.allSurveys.filter((survey: Survey) => survey.getLevel().toString() === Level.ONE_MONTH);
      }
      else if (this.data.stopDate === "sixMonths") {
        this.allSurveys = this.allSurveys.filter((survey: Survey) => survey.getLevel() === Level.SIX_MONTHS)
      }
      else {this.allSurveys = this.allSurveys.filter((survey: Survey) => survey.getLevel() === Level.ONE_YEAR)}      
    })            
  }

  addCreatedSurvey(event: Event): void {
    this.surveyId = parseInt((event.target as HTMLTextAreaElement).value);
<<<<<<< HEAD
    console.log("surveyId in dialog: ",this.surveyId)      
=======
    console.log('survey in getValues', this.surveyId, 'typeof surveyid : ', typeof(this.surveyId));
    // var surveyCreatedId = ((<HTMLInputElement>document.getElementById("addCreatedSurvey")).value);
    this.surveyService.findOne(this.surveyId).subscribe((survey: Survey) => {
      this.surveySelected = survey;
      this.surveyId = this.surveySelected.getId();
      console.log("L'utilisateur souhaite envoyer le questionnaire", this.surveySelected.getTitle());
    }
    );    
>>>>>>> 48cc833fb58c9ceebef8910735d50014ee4f5459
  }

  // getSurveyTitle(): string {
  //   if (this.surveySelected !== undefined) {return this.surveySelected.getTitle();}
  //   return "";
  // }

}
