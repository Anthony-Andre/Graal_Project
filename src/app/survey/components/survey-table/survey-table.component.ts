import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Survey } from '../../core/models/survey';
import { SurveyService } from '../../core/services/survey.service';
import { DeleteSurveyDialogComponent } from '../dialogs/delete-survey-dialog/delete-survey-dialog.component';

@Component({
  selector: 'app-survey-table',
  templateUrl: './survey-table.component.html',
  styleUrls: ['./survey-table.component.scss']
})
export class SurveyTableComponent implements OnInit {

  // public surveyService!: SurveyService;
  public surveys: Array<Survey> = [];
  public confirmation: string = "false";


  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.surveyService.findAll().subscribe((surveys: Survey[]) => {
      this.surveys = surveys;
    })
  }

  public onRemoveSurveyDialog(survey: Survey): void {
    const dialogRef = this.dialog.open(DeleteSurveyDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.confirmation = result;
      this.onRemove(survey);
    })
  }

  public onRemove(survey: Survey): void {
    console.log(`L'utilisateur souhaite supprimer ${survey.getTitle()}`);
    if (this.confirmation === "true") {
      this.surveyService.delete(survey).subscribe({
        next: (response: HttpResponse<any>) => { },
        error: (error: any) => { },
        complete: () => {
          this.surveys.splice(
            this.surveys.findIndex((s: Survey) => s.getId() === survey.getId()),
            1
          )
        }
      });
    }
  }

  public onUpDate(survey: Survey): void {
    console.log(`L'utilisateur souhaite modifier '${survey.getTitle()}'`);
    console.log(`Id du survey : `, survey.getId());
    this.router.navigate(['/', 'survey', 'update', survey.getId()]);
  }

}
