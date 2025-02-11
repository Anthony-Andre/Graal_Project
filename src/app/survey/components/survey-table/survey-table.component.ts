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
  public croissantTitle: boolean = false;
  public croissantLevel: boolean = false;
  public stopDate: String | null = null;


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

  public filterChanged(event: String | null): void {
    console.log(`Filter has changed to : ${event}`);
    this.stopDate = event;
  }

  public changeView(survey: Survey): boolean {
    if (this.stopDate === null) {
      return true;
    }
    if (this.stopDate === "oneMonth") { // dateOfTheDay pas ok ici
      return (survey.getLevel().toString() === 'ONE_MONTH');
    }
    if (this.stopDate === "sixMonths") {
      return (survey.getLevel().toString() === 'SIX_MONTHS');
    }
    return (survey.getLevel().toString() === 'ONE_YEAR');
  }


  public sortByTitle() {
    // tri par ordre croissant/décroissant par Title
    this.croissantLevel = false;
    if (this.croissantTitle) {
      this.croissantTitle = false;
      function SortArray(x: any, y: any){
        return x.getTitle().localeCompare(y.getTitle());
      }
      return this.surveys.sort(SortArray);    
    } else {
      this.croissantTitle = true;
      function SortArray(x: any, y: any){
        return y.getTitle().localeCompare(x.getTitle());
      }
      return this.surveys.sort(SortArray);    
    }
  }

  public sortByLevel() {
    // tri par ordre croissant/décroissant par Level
    this.croissantTitle = false;
    if (!this.croissantLevel) {
      this.croissantLevel = true
      this.surveys.sort((a, b) => {
        var nameA = a.getLevel();
        var nameB = b.getLevel();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
        })
    } else {
    this.croissantLevel = false;
    this.surveys.sort((a, b) => {
      var nameA = a.getLevel();
      var nameB = b.getLevel();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
      })
    }
  }

}
