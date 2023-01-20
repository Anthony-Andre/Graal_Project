import { AnswerType } from "src/app/core/enums/AnswerType";

export class QuestionDto {
  public id?: number
  public text: string = "";
  public answerType!: AnswerType;
  public answersProposed!: Array<String>;

  public constructor(formValues: any) {
    Object.assign(this, formValues);
    //this.text=formValues.titleControl;
    //this.answerType=formValues.answerChoose
    //this.answerProposed=formValues.answerProposed
  }

  public addAnswers(answers: string[]) {
    this.answersProposed = answers
  }
}
