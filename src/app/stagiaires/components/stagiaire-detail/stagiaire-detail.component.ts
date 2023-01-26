import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Level } from 'src/app/core/enums/level';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';
import { AnsweredSurvey } from 'src/app/survey/core/models/answered-survey';
import { Survey } from 'src/app/survey/core/models/survey';
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
  public answeredSurvey!: AnsweredSurvey;
  public answeredSurveysFiltred: Array<AnsweredSurvey> = [];
  public survey: Survey = new Survey();
  public levelOneMonth!: string;
  public levelSixMonths!: string;
  public levelOneYear!: string;
  public oneMonthAnswered: boolean = false;
  public sixMonthsAnswered: boolean = false;
  public oneYearAnswered: boolean = false;
  public oneMonthSurveyId!: number;



  public bubbleConfig: any = {
    backgroundColor: 'rgba(189, 58, 58, 0.651)',
    color: '#fff',
    border: 'solid 2px rgb(2, 222, 45)'
  }

  constructor(
    private handleDetailService: HandleDetailService,
    private route: ActivatedRoute,
    private router: Router,
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
          for (const answeredSurvey of this.answeredSurveys) {
            if (answeredSurvey.getStagiaire().id === this.stagiaire.getId()) {
              // on tri les answeredSurveys auquels le stagiaire a répondu
              this.answeredSurvey = answeredSurvey;
              // on récupère le survey contenu dans ces answeredSurveys
              const survey: Survey = new Survey();    
              survey.setId(answeredSurvey.getSurvey().id);
              survey.setLevel(answeredSurvey.getSurvey().level);
              this.survey = survey;
              this.answeredSurvey.setSurvey(this.survey)
              // on les push dans un tableau
              this.answeredSurveysFiltred.push(this.answeredSurvey);

              // var level = Object.keys(Level).indexOf(this.answeredSurvey.getSurvey().getLevel());

              console.log(this.answeredSurveysFiltred);

              if (this.survey.getLevel() === 'ONE_MONTH')
              this.levelOneMonth = this.survey.getLevel();
            if (this.survey.getLevel() === 'SIX_MONTHS')
              this.levelSixMonths = this.survey.getLevel();
            if (this.survey.getLevel() === 'ONE_YEAR')
              this.levelOneYear = this.survey.getLevel();
            }
          }
          // this.answeredSurveysFiltred.forEach(survey => {
          //   console.log('if');
            
          //   if (survey.getSurvey().getLevel() === 'ONE_MONTH')
          //     this.oneMonthAnswered = true;
          //     this.oneMonthSurveyId = survey.getId();
          //     console.log('lol :', this.oneMonthSurveyId);
              
          //   if (survey.getSurvey().getLevel() === 'SIX_MONTHS')
          //     this.sixMonthsAnswered = true;
          //   if (survey.getSurvey().getLevel() === 'ONE_YEAR')
          //     this.oneYearAnswered = true;
          // });
        })
      })
      
  }

  public changeStagiaire(stagiaire: Stagiaire) {
    this.stagiaire = stagiaire;
  }

  public closeStagiaireCard() {
    this.handleDetailService.setIsDetailHidden(true);
  }

  public redirectTo(id: number) {
    this.router.navigate(['/', 'answered-survey', id])
    console.log(this.answeredSurvey.getId());
    
  }
}
