import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { Survey } from '../core/models/survey';
import { FormBuilderService } from '../core/services/form-builder/form-builder.service';
import { SurveyService } from '../core/services/survey.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyResolver implements Resolve<FormGroup> {
  public constructor(
    private surveyService: SurveyService,
    private formBuilderService: FormBuilderService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormGroup> {


    const id: number = +route.paramMap.get('id')!;
    console.log("id:", id);
    let survey: Survey;
    let form: FormGroup;

    if (id === 0) {
      survey = new Survey();
      form = this.formBuilderService.build(survey).getForm();
      return of(form);
    } else {
      return this.surveyService.findOne(id)
        .pipe(
          take(1),
          map((oSurvey: Survey) => {
            return this.formBuilderService.build(oSurvey).getForm();
          })
        )
    }
  }
}
