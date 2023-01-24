import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Survey } from '../../models/survey';
import { Inject } from '@angular/core';
import { AnsweredSurvey } from '../../models/answered-survey';

@Injectable({
  providedIn: 'root'
})
export class TraineeSurveyFormService {

  private form!: FormGroup;
  private survey: AnsweredSurvey = new AnsweredSurvey();

  constructor(
    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private locale: string
  ) {
    this.locale = 'fr';
    this.adapter.setLocale(this.locale);
  }

  public getForm(): FormGroup {
    return this.form;
  }

  public build(survey: AnsweredSurvey): TraineeSurveyFormService {
    this.survey = survey

    this.form = this.formBuilder.group({
      trainee: [
        this.survey.getStagiaire,
        [
          Validators.required
        ]
      ],
      survey: [
        this.survey.getSurvey(),
        [
          Validators.required
        ]
      ],
      answers: [
        this.survey.getAnswers(),
        [
          Validators.required
        ]
      ],
    });

    return this;
  }
}
