import { ThisReceiver } from '@angular/compiler';
import { Inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Poe } from '../../models/poe';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  private form!: FormGroup;
  private poe: Poe = new Poe();
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

  public build(poe: Poe): FormBuilderService {
    this.poe = poe
    if (poe.getId() !== 0) {
      this.updateMode = true;
    }

    this.form = this.formBuilder.group({
      title: [
        this.poe.getTitle(),
        [
          Validators.required
        ]
      ],
      beginDate: [
        this.poe.getBeginDate() !== null ? this.poe.getBeginDate() : '',
        [
          Validators.required
        ]
      ],
      endDate: [
        this.poe.getEndDate() !== null ? this.poe.getEndDate() : '',
        [
          Validators.required
        ]
      ],
      type: [
        this.poe.getType(),
        [
          Validators.required
        ]
      ]
    });


    if (this.updateMode) {
      const idControl: AbstractControl = new FormControl(this.poe.getId());
      this.form.addControl('id', idControl);
    }

    return this;
  }
}
