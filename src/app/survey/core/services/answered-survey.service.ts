import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { flatMap, map, Observable, of, take } from 'rxjs';
import { AnsweredSurvey } from '../models/answered-survey';
import { AnsweredSurveyDto } from '../../dto/answered-survey-dto';

@Injectable({
  providedIn: 'root'
})
export class AnsweredSurveyService {

  private controllerBaseUrl: string = `${environment.apiBaseUrl}/answered-survey`;

  constructor(private httpClient: HttpClient) { }


  public findAll(): Observable<any> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
      .pipe(
        take(1),
        map((answeredSurveys: any[]) => {
          return answeredSurveys.map((inputSurvey: any) => {
            const answeredSurvey: AnsweredSurvey = new AnsweredSurvey();
            answeredSurvey.setId(inputSurvey.id);
            answeredSurvey.setSurvey(inputSurvey.survey);
            answeredSurvey.setStagiaire(inputSurvey.trainee);
            answeredSurvey.setAnswers(inputSurvey.responses)
            return answeredSurvey;
          })
        })
      )
  }

  public findOne(id: number): Observable<AnsweredSurvey> {
    return this.httpClient.get<any>(
      `${this.controllerBaseUrl}/${id}`
    ).pipe(
      take(1),
      map((inputSurvey: any) => {
        const answeredSurvey: AnsweredSurvey = new AnsweredSurvey();
        answeredSurvey.setId(inputSurvey.id);
        answeredSurvey.setSurvey(inputSurvey.survey);
        answeredSurvey.setStagiaire(inputSurvey.trainee);
        answeredSurvey.setAnswers(inputSurvey.responses)
        return answeredSurvey;
      })
    )
  }



  public addSurvey(survey: AnsweredSurveyDto): Observable<AnsweredSurvey> {
    console.log('add survey : ', survey)
    return this.httpClient.patch<AnsweredSurveyDto>(
      this.controllerBaseUrl,
      survey
    )
      .pipe(
        take(1),
        map((surveyDto: any) => {
          const survey: AnsweredSurvey = new AnsweredSurvey();
          survey.setId(surveyDto.id!);
          survey.setSurvey(surveyDto.survey);
          survey.setStagiaire(surveyDto.trainee);
          survey.setAnswers(surveyDto.responses);
          return survey;
        })
      );
  }

  public searchSurvey(surveyId: number, traineeId: number): Observable<boolean> {
    console.log("L'utilisateur souhaite chercher si le questionnaire : ", surveyId, " du stagiaire : ", traineeId, " est bien rempli");
    return this.httpClient.get<any>(`${this.controllerBaseUrl}/search?surveyId=${surveyId}&traineeId=${traineeId}`)
      .pipe(
        take(1),
        flatMap((response: any) => {
          console.log("response du back ", response);
          if (response === true) { return of(true); }
          else { return of(false); }
        }));
  }




}