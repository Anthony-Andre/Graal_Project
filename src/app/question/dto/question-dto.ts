import { AnswerType } from "src/app/core/enums/AnswerType";

export class QuestionDto {
    public id?: number 
    public text: string = "";
    public answerType!: AnswerType;
    private answerProposed!: Array<String>;

    public constructor(formValues: any) {
        Object.assign(this, formValues);
      }
}
