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
  surveySelected!: Survey;
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

  getSurvey(): Array<Survey> {
    console.log("stopDate equals oneMOnth", this.data.stopDate === "oneMonth");
    // console.log(this.allSurveys);
    // if (this.data.stopDate === "oneMonth" ) {
    //   return this.allSurveys.filter((survey: Survey) => survey.getLevel() === Level.ONE_MONTH);
    // }
    return [];
    // if (this.data.stopDate === "SixMonths" ) {
    //   return this.allSurveys.filter((survey : Survey) => survey.getLevel() === Level.SIX_MONTHS);
    // }
    // return this.allSurveys.filter((survey: Survey) => survey.getLevel() === Level.ONE_YEAR);
  }

}
