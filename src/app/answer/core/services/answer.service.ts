import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private surveys: Array<Answer> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/answer`;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
      .pipe(
        take(1),
        map((answers: any[]) => {
          return answers.map((inputAnswer: any) => {
            const answer: Answer = new Answer();
            answer.setId(inputAnswer.id);
            answer.setText(inputAnswer.text)
            
            
            
            //console.log(survey);
            return answer;
          })
        })
      )
  }

  public findOne(id: number): Observable<Answer> {
    return this.httpClient.get<any>(
      `${this.controllerBaseUrl}/${id}`
    ).pipe(
      take(1),
      map((inputAnswer: any) => {
        const answer: Answer = new Answer();
        answer.setId(inputAnswer.id);
        answer.setText(inputAnswer.text)
        
            
            
            //console.log(survey);
        return answer;
      })
    )
  }
}
