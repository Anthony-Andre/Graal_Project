import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionDto } from '../../dto/question-dto';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private surveys: Array<Question> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/question`;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
      .pipe(
        take(1),
        map((questions: any[]) => {
          return questions.map((inputQuestion: any) => {
            const question: Question = new Question();
            question.setId(inputQuestion.id);
            question.setText(inputQuestion.text)
            question.setAnswerType(inputQuestion.answerType)
            question.setAnswersProposed(inputQuestion.answersProposed)


            //console.log(survey);
            return question;
          })
        })
      )
  }

  public findOne(id: number): Observable<Question> {
    return this.httpClient.get<any>(
      `${this.controllerBaseUrl}/${id}`
    ).pipe(
      take(1),
      map((inputQuestion: any) => {
        const question: Question = new Question();
        question.setId(inputQuestion.id);
        question.setText(inputQuestion.text)
        question.setAnswerType(inputQuestion.answerType)
        question.setAnswersProposed(inputQuestion.answersProposed)


        //console.log(survey);
        return question;
      })
    )
  }

  public addQuestion(question: QuestionDto): Observable<Question> {
    //console.log('add question : ', question)
    return this.httpClient.patch<QuestionDto>(
      this.controllerBaseUrl,
      question
    )
      .pipe(
        take(1),
        map((questionDto: any) => {
          const question: Question = new Question();
          question.setId(questionDto.id);
          question.setText(questionDto.text)
          question.setAnswerType(questionDto.answerType)
          question.setAnswersProposed(questionDto.answersProposed)


          //console.log(survey);
          return question;
        })
      );
  }

  public delete(question: Question): Observable<HttpResponse<any>> {
    return this.httpClient.delete(
      `${this.controllerBaseUrl}/${question.getId()}`,
      {
        observe: 'response'
      }
    );
  }

}
