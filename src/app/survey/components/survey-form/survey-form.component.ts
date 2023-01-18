import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Level } from 'src/app/core/enums/level';
import { PoeType } from 'src/app/core/enums/poe-type';
import { Question } from 'src/app/question/core/models/question';
import { QuestionService } from 'src/app/question/core/services/question.service';
import { Survey } from '../../core/models/survey';
import { SurveyService } from '../../core/services/survey.service';
import { SurveyDto } from '../../dto/survey-dto';
import { SurveyMatDialogComponent } from '../survey-mat-dialog/survey-mat-dialog/survey-mat-dialog.component';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  public addMode: boolean = true;

  // passenger!: FormArray;
  // surveyForm = new FormGroup({
  // title: new FormControl('',Validators.required),
  // addNewQuestion: new FormControl(''),
  // addCurrentQuestion: new FormControl(''),  
  // level:new FormControl('',Validators.required),
  // });

  title = this.formBuilder.group({titleControl: ['', Validators.required]});
  survey = this.formBuilder.group({
    typeControl: ['',Validators.required],
    levelControl: ['', Validators.required]});
  addQuestions = this.formBuilder.group({
    oldQuestionControl: [''],
    newQuestionControl: ['']
  });

  @ViewChild(SurveyMatDialogComponent) comp!:SurveyMatDialogComponent
  public showInput = false;
  public showSelect = false;
  public currentQuestion!: string;
  public newQuestion!: string;
  public questions: Array<Question> = [];
  public questionsAdded: Array<Question>=[];
  options =[Level.ONE_MONTH,Level.SIX_MONTHS,Level.ONE_YEAR]
  options2 =[PoeType.POEI,PoeType.POEC]
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private surveyService: SurveyService,
    private _location: Location,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getAllQuestions();    
    

    // /*-- Add by Raph : switch mode ADD ou UPDATE --*/
    // const data: any = this.route.snapshot.data;
    // console.log(`${data.form instanceof FormGroup ? 'OK' : 'KO'}`);
    // this.surveyForm = data.form;

    // this.surveyService.findAll().subscribe((surveys: Survey[]) => {
    //   this.surveys = surveys;
    // })


    // if (this.surveyForm.value.id !== 0 && this.surveyForm.value.id !== undefined) {
    //   this.addMode = false;
    //   console.log('id =', this.surveyForm.value.id);
    // } else {
    //   this.addMode = true;
    //   console.log('id =', this.surveyForm.value.id);
    // }
    // /*-- End by Raph--*/

  }

  

  InsertQuestion(){
    //console.log('Insert')
    this.showInput = !this.showInput
    //this.passenger.push(
      //new FormGroup({
     //   addNewQuestion: new FormControl(''),
     // })
    //);


    this.dialog.open(SurveyMatDialogComponent,{
      ///data:s,
      height: '450px',
      width: '600px'
      
     })
    .afterClosed().subscribe((result) =>{
      })
  }

  InsertSelect(){
    this.showSelect = !this.showSelect     
  }

  getAllQuestions(){
    this.questionService.findAll().subscribe((questions: Question[]) => {
      this.questions = questions;
      console.log(this.questions)
    })
  }

  getOptionLabelLevel(option: Level) {
    switch (option) {
      case Level.ONE_MONTH:
        return "ONE_MONTH";
      case Level.SIX_MONTHS:
        return "SIX_MONTHS";
        case Level.ONE_YEAR:
          return "ONE_YEAR";
      default:
        
        throw new Error("Unsupported option");
    }
  }

  getOptionLabelPoeType(option: PoeType) {
    switch (option) {
      case PoeType.POEI:
        return "POEI";
      case PoeType.POEC:
        return "POEC";
      default:
        throw new Error("Unsupported option");
    }
  }

  

   



  // onSubmit() {
  //  console.log('Delegate add survey: ', this.surveyForm.value);

  //  const surv: SurveyDto = new SurveyDto(this.surveyForm.value);

  //  let subscription: Observable<any>;
  //  subscription = this.surveyService.addSurvey(surv);
  //  subscription.subscribe(() => this.nextStape())

  // }

  public nextStape(): void {
    this.router.navigate(['/', 'question'])
  }

  public goHome(): void {
    this._location.back();  }

  public addQuestion(): void {
    
    
  }

}


