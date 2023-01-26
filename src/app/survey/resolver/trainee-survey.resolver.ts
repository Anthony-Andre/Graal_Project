import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { flatMap, map, Observable, of, take } from 'rxjs';
import { Request } from 'src/app/user/models/request';
import { AuthService } from 'src/app/user/services/auth-service.service';
import { AnsweredSurvey } from '../core/models/answered-survey';
import { Survey } from '../core/models/survey';
import { AnsweredSurveyService } from '../core/services/answered-survey.service';
import { FormBuilderService } from '../core/services/form-builder/form-builder.service';
import { TraineeSurveyFormService } from '../core/services/form-builder/trainee-survey-form.service';
import { SurveyService } from '../core/services/survey.service';

@Injectable({
  providedIn: 'root'
})
export class TraineeSurveyResolver implements Resolve<FormGroup> {

  private request!: Request;

  public constructor(
    private surveyService: SurveyService,
    private formBuilderService: TraineeSurveyFormService,
    private answeredSurveyService: AnsweredSurveyService,
    private router: Router,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormGroup> {
    let survey: AnsweredSurvey;
    survey = new AnsweredSurvey();
    this.request = { userName: "anonymous", userPwd: "anonymous", stayConnected: false }
    return this.authService.signin(this.request).pipe(
      take(1),
      flatMap(() => {
        const id: number = +route.paramMap.get('id')!;
        const idSurvey: number = +route.paramMap.get('idSurvey')!;
        console.log("id:", id);
        console.log("idSurvey: ", idSurvey);
        let form = this.formBuilderService.build(survey).getForm();
        return of(form);
      }));
  }
}