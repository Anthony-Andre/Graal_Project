import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnswerType } from 'src/app/core/enums/AnswerType';
import { QuestionService } from 'src/app/question/core/services/question.service';
import { QuestionDto } from 'src/app/question/dto/question-dto';
import { Location } from '@angular/common';

@Component({
  selector: 'app-survey-mat-dialog',
  templateUrl: './survey-mat-dialog.component.html',
  styleUrls: ['./survey-mat-dialog.component.scss']
})
export class SurveyMatDialogComponent implements OnInit {

  @ViewChild('chooseOne') chooseOne!: ElementRef;
  @ViewChild('chooseMany') chooseMany!: ElementRef;
  //@ViewChild('') input!: ElementRef

  constructor(private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    //this.getAllAnswers();
  }

  optionsAnswer = [AnswerType.YES_NO, AnswerType.CHOOSE_MANY, AnswerType.CHOOSE_ONE, AnswerType.FREE]
  optionsYesNoAnswer: any[] = ['YES', 'NO']
  anotherOptionList: string[] = [];
  answerType: string = ''
  selectedOption!: string;
  printedOption!: string;
  selected: string = 'YES';
  answerRegistered: string[] = []
  inputFreeAnswer: string = '';
  //chooseOne!:string;
  //chooseMany!:string;

  surveyMatDialogForm = this.formBuilder.group({text: ['', Validators.required],
  answerType: ['',Validators.required],
  answersProposed:[[]]
});

  //answerPurposed = this.formBuilder.group({
  //chooseOne: ['',Validators.required],
  //chooseMany: ['', Validators.required]});


  //surveyMatDialogForm = new FormGroup({
  //question:new FormControl('',Validators.required),
  // chooseOneAnswer: new FormControl('',Validators.required),
  // chooseManyAnswer: new FormControl('',Validators.required),
  //answer:new FormControl('',Validators.required),

  //});


  getOptionLabelAnswerType(option: AnswerType) {
    this.anotherOptionList = [];

    //console.log(JSON.stringify(option))
    switch (option) {

      case AnswerType.YES_NO:
        return "YES_NO";
      //this.anotherOptionList = "ONE_MONTH"
      case AnswerType.CHOOSE_MANY:
        return "CHOOSE_MANY";
      case AnswerType.CHOOSE_ONE:
        return "CHOOSE_ONE";
      case AnswerType.FREE:
        return "FREE"
      default:
        return ''
      //this.anotherOptionList = []
      //return ""
      // throw new Error("Unsupported option");
    }
  }


  onSubmit(){
    
    const quest:QuestionDto=new QuestionDto(this.surveyMatDialogForm.value)
    quest.addAnswers(this.answerRegistered)
    console.log(this.surveyMatDialogForm.value)

    let subscription: Observable<any>;
    subscription = this.questionService.addQuestion(quest)
    subscription.subscribe((result: any) =>
      this._location.back())




  }


  //getAllAnswers(){

  //}

  getAllAnswers(dataAns: string) {

    console.log(dataAns);
    this.answerRegistered.push(dataAns)
    this.answerRegistered = this.answerRegistered.filter((el, i, a) => i === a.indexOf(el))
    console.log('Answers',this.answerRegistered)
    
    //this.chooseOne = '';
    //this.chooseMany='';

    //this.chooseOne.nativeElement.value=''
    //this.chooseMany.nativeElement.value=''


    //getted from binding
    //console.log(this.selected)

    //this.printedOption = this.selectedOption;
    //console.log(this.printedOption)
  }
  clearChooseOne() {
    this.chooseOne.nativeElement.value = '';
    //this.chooseOne=''
  }

  clearChooseMany() {
    this.chooseMany.nativeElement.value = '';
    //this.chooseMany=''
  }
}
