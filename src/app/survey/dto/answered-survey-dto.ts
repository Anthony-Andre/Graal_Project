import { Answer } from "src/app/answer/core/models/answer";
import { Stagiaire } from "src/app/core/models/stagiaire";
import { Survey } from "../core/models/survey";

export class AnsweredSurveyDto {

  private id?: number = 0;
  private survey: Survey = new Survey();
  private trainee: Stagiaire = new Stagiaire();
  private responses: Array<Answer> = [];


  public constructor(formValues: any) {
    Object.assign(this, formValues);
    // this.poeType = formValues.type; 
  }

  public setAnswers(answers: Array<Answer>) {
    this.responses = answers;
  }


}
