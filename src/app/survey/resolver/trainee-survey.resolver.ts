import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { Survey } from '../core/models/survey';
import { FormBuilderService } from '../core/services/form-builder/form-builder.service';
import { SurveyService } from '../core/services/survey.service';

@Injectable({
  providedIn: 'root'
})
export class TraineeSurveyResolver implements Resolve<FormGroup> {
  public constructor(
    private surveyService: SurveyService,
    private formBuilderService: FormBuilderService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormGroup> {


    const id: number = +route.paramMap.get('id')!;
    const idSurvey: number = +route.paramMap.get('idSurvey')!;
    console.log("id:", id);
    console.log("idSurvey: ", idSurvey);
    let survey: Survey;
    let form: FormGroup;

    if (idSurvey === 0) {
      survey = new Survey();
      this.router.navigate(['/', 'home']);
      form = this.formBuilderService.build(survey).getForm();
      return of(form);
    } else {
      return this.surveyService.findOne(idSurvey)
        .pipe(
          take(1),
          map((oSurvey: Survey) => {
            return this.formBuilderService.build(oSurvey).getForm();
          })
        )
    }
  }
}
