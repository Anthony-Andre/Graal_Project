import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Survey } from '../../models/survey';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  private form!: FormGroup;
  private survey: Survey = new Survey();
  private updateMode: boolean = false;

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

  public build(survey: Survey): FormBuilderService {
    this.survey = survey
    if (survey.getId() !== 0) {
      this.updateMode = true;
    }

    this.form = this.formBuilder.group({
      title: [
        this.survey.getTitle(),
        [
          Validators.required
        ]
      ],
      poeType: [
        this.survey.getPoeType(),
        [
          Validators.required
        ]
      ],
      level: [
        this.survey.getLevel(),
        [
          Validators.required
        ]
      ],
      questions: [
        this.survey.getQuestions(),
        [
          Validators.required
        ]
      ]
    });


    if (this.updateMode) {
      const idControl: AbstractControl = new FormControl(this.survey.getId());
      this.form.addControl('id', idControl);
    }

    return this;
  }
}
