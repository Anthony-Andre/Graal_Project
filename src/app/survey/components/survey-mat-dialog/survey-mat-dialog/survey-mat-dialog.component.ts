import { Component, OnInit } from '@angular/core';
import { AnswerType } from 'src/app/core/enums/AnswerType';

@Component({
  selector: 'app-survey-mat-dialog',
  templateUrl: './survey-mat-dialog.component.html',
  styleUrls: ['./survey-mat-dialog.component.scss']
})
export class SurveyMatDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  optionsAnswer =[AnswerType.YES_NO,AnswerType.CHOOSE_MANY,AnswerType.CHOOSE_ONE,AnswerType.FREE]
  optionsYesNoAnswer = ['YES','NO']
  anotherOptionList: string[] = [];
  answerType:string=''
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



}
