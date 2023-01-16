import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Level } from 'src/app/core/enums/level';
import { PoeType } from 'src/app/core/enums/poe-type';
import { Survey } from '../../core/models/survey';
import { SurveyService } from '../../core/services/survey.service';
import { SurveyDto } from '../../dto/survey-dto';
import * as moment from 'moment';
import { QuestionService } from 'src/app/question/core/services/question.service';
import { Question } from 'src/app/question/core/models/question';

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
    addCurrentQuestion: new FormControl(''),
    type: new FormControl('',Validators.required),
    level:new FormControl('',Validators.required),
    //check:new FormControl(false,Validators.requiredTrue),

  });
  showInput = false
  showSelect = false
  public surveys: Array<Survey> = [];
  public questions: Array<Question> =[]
  public itemResearch: any[] = [];
  options =[Level.ONE_MONTH,Level.SIX_MONTHS,Level.ONE_YEAR]
  options2 =[PoeType.POEI,PoeType.POEC]
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private questionService: QuestionService
    ) { }

  ngOnInit(): void {
    this.getAllQuestions();

    //const Res1 = this.surveys
    
    
  }

  

  InsertQuestion(){
    //console.log('Insert')
    this.showInput = !this.showInput
    //this.passenger.push(
      //new FormGroup({
     //   addNewQuestion: new FormControl(''),
     // })
    //);

  }

  InsertSelect(){
    this.showSelect = !this.showSelect     
  }

  //getAllQuestions(){
    ///this.surveyService.findAll().subscribe((survey: Survey[]) => {
     // this.surveys = survey;
      //console.log(this.surveys[0] instanceof Survey);
     // console.log(this.surveys)

     // const Result = this.surveys
     // const len = Result.length
      
      //for (let i=0;i<len;i++){
      //  var skinName = Result.find(x=>x.getId() == i+1)?.getTitle();
        //console.log(skinName)
       // this.itemResearch[i]=skinName
       // }

      //  console.log(this.itemResearch)

    //})
 // }

  getAllQuestions(){
    this.questionService.findAll().subscribe((question: Question[]) => {
      this.questions = question;
      //console.log(this.surveys[0] instanceof Survey);
      console.log(this.questions)

      const Result = this.questions
      const len = Result.length
      
      for (let i=0;i<len;i++){
        var skinName = Result.find(x=>x.getId() == i+1)?.getText();
        //console.log(skinName)
        this.itemResearch[i]=skinName
        }

        console.log(this.itemResearch)

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

  

   



  onSubmit() {
    console.log('Delegate add survey: ', this.surveyForm.value);

    const surv: SurveyDto = new SurveyDto(this.surveyForm.value);

    let subscription: Observable<any>;
    let subscription2: Observable<any>
    subscription = this.surveyService.addSurvey(surv);
    subscription.subscribe(() => this.nextStape())

  }

  public nextStape(): void {
    this.router.navigate(['/', 'question'])
  }

  public goHome(): void {
    this.router.navigate(['/', 'home'])
  }


  public static Optional1(): ValidatorFn {
           
    return (control: AbstractControl): ValidationErrors | null => {

      if (!control.value) return null;

      const today: moment.Moment = moment(); // Récupère la date du jour
      //today.subtract(18, 'y');


      // Récupérer la valeur saisie
      const enteredDate: moment.Moment = moment(control.value);
      if (enteredDate.isAfter(today)) {
          return {dateLessThan: true};
      }
      return null;
        }
    }

   

}
