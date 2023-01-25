import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { appendFile } from 'fs';
import { emit } from 'process';
import { AnswerService } from 'src/app/answer/core/services/answer.service';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';
import { AnsweredSurvey } from 'src/app/survey/core/models/answered-survey';
import { AnsweredSurveyService } from 'src/app/survey/core/services/answered-survey.service';

@Component({
  selector: 'app-stagiaire-detail',
  templateUrl: './stagiaire-detail.component.html',
  styleUrls: ['./stagiaire-detail.component.scss']
})
export class StagiaireDetailComponent implements OnInit {

  @Input() stagiaire: Stagiaire = new Stagiaire();
  // @Output() public changeVisibility: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  // @Output() public onChangeState: EventEmitter<Stagiaire | null> = new EventEmitter<Stagiaire | null>();
  
  public answeredSurveys: Array<any> = [];

  public bubbleConfig: any = {
    backgroundColor: 'rgba(189, 58, 58, 0.651)',
    color: '#fff',
    border: 'solid 2px rgb(2, 222, 45)'
  }

  constructor(
    private handleDetailService: HandleDetailService,
    private route: ActivatedRoute,
    private stagiaireService: StagiaireService,
    private answeredSurveyService: AnsweredSurveyService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((routeParams: Params) => {
        const stagiaireId: number = routeParams['id'];
        this.stagiaireService.findOne(stagiaireId)
          .subscribe((stagiaire: Stagiaire) =>
            this.stagiaire = stagiaire
          )
        this.answeredSurveyService.findAll().subscribe((surveys: AnsweredSurvey[]) => {
          this.answeredSurveys = surveys;
          // this.answeredSurveys = this.answeredSurveys.filter((survey: any) => {
          //   survey.getStagiaire().id === this.stagiaire.getId() {
          //     console.log('là : ', this.answeredSurveys);
          for (const survey of this.answeredSurveys) {
            if (survey.getStagiaire().id === this.stagiaire.getId()) {
              console.log("surveyFiltred : ", survey);
            }
          }
        })
      })
      
  }

  public changeStagiaire(stagiaire: Stagiaire) {
    this.stagiaire = stagiaire;
  }

  public closeStagiaireCard() {
    this.handleDetailService.setIsDetailHidden(true);
  }

}
