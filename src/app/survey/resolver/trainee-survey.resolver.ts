import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { AnsweredSurvey } from '../core/models/answered-survey';
import { Survey } from '../core/models/survey';
import { FormBuilderService } from '../core/services/form-builder/form-builder.service';
import { TraineeSurveyFormService } from '../core/services/form-builder/trainee-survey-form.service';
import { SurveyService } from '../core/services/survey.service';

@Injectable({
  providedIn: 'root'
})
export class TraineeSurveyResolver implements Resolve<FormGroup> {
  public constructor(
    private surveyService: SurveyService,
    private formBuilderService: TraineeSurveyFormService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormGroup> {


    const id: number = +route.paramMap.get('id')!;
    const idSurvey: number = +route.paramMap.get('idSurvey')!;
    console.log("id:", id);
    console.log("idSurvey: ", idSurvey);
    let survey: AnsweredSurvey;
    let form: FormGroup;

    survey = new AnsweredSurvey();
    form = this.formBuilderService.build(survey).getForm();
    return of(form);
  }
}
