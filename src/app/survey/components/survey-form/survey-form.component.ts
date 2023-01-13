import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  //surveyForm!: FormGroup;

  passenger!: FormArray
  surveyForm = new FormGroup({
    title: new FormControl('',Validators.required),
    addNewQuestion: new FormControl('',Validators.required),
    addCurrentQuestion: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),

  });
  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {


  }

  InsertQuestion(){
    this.passenger.push(
      new FormGroup({
        addNewQuestion: new FormControl(''),
      })
    );

  }

  SelectQuestion(){
         
  }


  onSubmit() {
    console.log('Delegate add survey: ', this.surveyForm.value);

    //const surv: SurveyDto = new SurveyDto(this.surveyForm.value);

    let subscription: Observable<any>;
    //subscription = this.surveyService.addSurvey(surv);
    //subscription.subscribe(() => this.nextStape())

  }

  public nextStape(): void {
    //this.router.navigate(['/', 'home'])
  }

  public goHome(): void {
    this.router.navigate(['/', 'home'])
  }

}
