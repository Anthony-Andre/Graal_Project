import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnswerType } from 'src/app/core/enums/AnswerType';
import { QuestionService } from 'src/app/question/core/services/question.service';
import { QuestionDto } from 'src/app/question/dto/question-dto';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { SurveyFormComponent } from '../../survey-form/survey-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SurveyService } from 'src/app/survey/core/services/survey.service';


@Component({
  selector: 'app-survey-mat-dialog',
  templateUrl: './survey-mat-dialog.component.html',
  styleUrls: ['./survey-mat-dialog.component.scss']
})
export class SurveyMatDialogComponent implements OnInit {

  id!:string;
  local_data!:any
  @ViewChild('chooseOne') chooseOne!: ElementRef;
  @ViewChild('chooseMany') chooseMany!: ElementRef;
  //@ViewChild('') input!: ElementRef

  constructor(private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private router: Router,
    private _location: Location,
    private surveyService: SurveyService,
    public dialogRef:MatDialogRef<SurveyMatDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //console.log(this.data);
        this.local_data = {...data};
        this.id = this.local_data.action;
        //console.log('Data',data)  
        //console.log('id',this.id)
      }

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
  inputFreeAnswer1: string = '';
  inputFreeAnswer2: string = '';
  inputArrayFreeAnswer:string[]=['']
  dataAns!:string
  inputChooseOne:string=''
  inputChooseMany:string=''
  arrayQuest:any[]=[]
  recupQuest:any
  //chooseOne!:string;
  //chooseMany!:string;

  surveyMatDialogForm = this.formBuilder.group({
  
  text: ['', [Validators.required]],
  answerType: ['',Validators.required],
  answersProposed:[[]],
  
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


  onSubmitMatDialog(){
    
    let quest:QuestionDto=new QuestionDto(this.surveyMatDialogForm.value)
    //console.log('QUEST',quest)
    //let ID = quest.id
    //console.log('ID',ID)
    let ansType = this.surveyMatDialogForm.get('answerType')?.value
    let ansProposed = this.surveyMatDialogForm.get('answerProposed')?.value
    if( ansType == 'CHOOSE_ONE' || ansType == 'CHOOSE_MANY'){
    quest.addAnswers(this.answerRegistered)
    this.data.dto = quest
    //console.log('Data Verif',this.data)
    this.recupQuest = this.data
    //console.log('Data Verif',this.recupQuest)
    this.surveyService.sendNewMessageSurv(this.data);
    
    //console.log(this.surveyMatDialogForm.value)
    //console.log('Select',this.surveyMatDialogForm.get('answerType')?.value)
    

    let subscription: Observable<any>;
    
    subscription = this.questionService.addQuestion(quest)
    subscription.subscribe((result) =>{
      this.data.dto = result
     console.log(result)
     console.log(this.data.dto)
    })
      //this._location.back())
    }

  if (ansType == 'YES_NO'){
    ansProposed = this.optionsYesNoAnswer
    quest.addAnswers(ansProposed)
    //console.log(quest)
    this.data.dto = quest
  
    //console.log('Data Verif',this.data)
    this.recupQuest = this.data
    
    this.surveyService.sendNewMessageSurv(this.data);
    let subscription: Observable<any>;
    subscription = this.questionService.addQuestion(quest)
    subscription.subscribe((result) =>{
      this.data.dto = result
      console.log(result)
      console.log(this.data.dto)
    })
      //this._location.back())
    }

  if(ansType == 'FREE'){
    ansProposed = this.inputArrayFreeAnswer
    quest.addAnswers(ansProposed)
    this.data.dto = quest
    //console.log('Data Verif',this.data)
    this.recupQuest = this.data
   // console.log('Data Verif',this.recupQuest)
    this.surveyService.sendNewMessageSurv(this.data);
    let subscription: Observable<any>;
    subscription = this.questionService.addQuestion(quest)
    subscription.subscribe((result: any) =>{
      this.data.dto = result
      console.log(result)
      console.log(this.data.dto)
    })
      //this._location.back())
      }
  
     // console.log(this.data)

      this.dialogRef.close(this.data);


  }

  //getAllAnswers(){

  //}

  getAllAnswers(dataAns: string) {


    //console.log(dataAns);
    this.answerRegistered.push(dataAns)
    this.answerRegistered = this.answerRegistered.filter((el, i, a) => i === a.indexOf(el))
    //console.log('Answers', this.answerRegistered)

    //this.chooseOne = '';
    //this.chooseMany='';

    //this.chooseOne.nativeElement.value=''
    //this.chooseMany.nativeElement.value=''


    //getted from binding
    //console.log(this.selected)

    //this.printedOption = this.selectedOption;
    //console.log(this.printedOption)
  }

  getValues(event: Event) {
    const Val = (event.target as HTMLTextAreaElement).value
    //console.log('setNewUserName', Val)
    if (Val == 'YES_NO' || 'FREE'){
      for(var index=0;index < this.answerRegistered.length;index ++){
      this.answerRegistered.splice(index)
      }
    }

    if (Val == 'CHOOSE_ONE' || 'CHOOSE_ANY'){
    this.inputFreeAnswer=''
    //console.log('Ans',this.answerRegistered)
    }


     

  }




  clearChooseOne() {
    //this.inputFreeAnswer1=''
    //this.inputChooseOne=null
    //this.chooseOne.nativeElement.value = '';
    //this.chooseOne=''
  }

  clearChooseMany() {
    console.log((<HTMLInputElement>document.getElementById("answerPurposed2")));
    (<HTMLInputElement>document.getElementById("answerPurposed2")).value = "";
    //this.inputFreeAnswer2=''
    //this.inputChooseMany=''
    //this.chooseMany.nativeElement.value = '';
    //this.chooseMany=''
  }

  public static formQuestionOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (!control.value) return null;

      const today: moment.Moment = moment(); // Récupère la date du jour
      today.subtract(18, 'y');


      // Récupérer la valeur saisie
      const enteredDate: moment.Moment = moment(control.value);
      if (enteredDate.isAfter(today)) {
        return { formQuestionOnly: true };
      }
      return null;
    }
  }

  spliceAnswer(arr: string[], id: number) {
    arr = this.answerRegistered
    const arr_id = arr[id]
    const ind = arr.findIndex(x => x === arr_id)
    console.log(arr_id)
    console.log(ind)

    this.answerRegistered.splice(ind, 1)

    //let len = this.answerRegistered.length

  }

  //encryptData(data:any) {

  //try {
  // return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
  //} catch (e) {
  //   console.log(e);
  // }
  //}

  //decryptData(data:any) {

  // try {
  // const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
  // if (bytes.toString()) {
  //   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  // }
  // return data;
  // } catch (e) {
  //   console.log(e);
  //  }
  //}
}
