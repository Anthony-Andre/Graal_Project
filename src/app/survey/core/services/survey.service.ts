import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private surveys: Array<Survey> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/survey`;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
      .pipe(
        take(1),
        map((surveys: any[]) => {
          return surveys.map((inputSurvey: any) => {
            const survey: Survey = new Survey();
            survey.setId(inputSurvey.id);
            survey.setTitle(inputSurvey.title)
            survey.setLevel(inputSurvey.level)
            survey.setPoeType(inputSurvey.type)
            
            //console.log(survey);
            return survey;
          })
        })
      )
  }

}
