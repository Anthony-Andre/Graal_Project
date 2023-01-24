import { Answer } from "src/app/answer/core/models/answer";
import { Stagiaire } from "src/app/core/models/stagiaire";
import { Survey } from "./survey";

export class AnsweredSurvey {

  private id: number = 0;
  private survey: Survey = new Survey();
  private stagiaire: Stagiaire = new Stagiaire();
  private answers: Array<Answer> = [];

  public getId(): number {
    return this.id;
  }

  public setId(value: number) {
    this.id = value;
  }

  public getSurvey(): Survey {
    return this.survey;
  }

  public setSurvey(value: Survey) {
    this.survey = value;
  }

  public getStagiaire(): Stagiaire {
    return this.stagiaire;
  }

  public setStagiaire(value: Stagiaire) {
    this.stagiaire = value;
  }

  public getAnswers(): Array<Answer> {
    return this.answers;
  }

  public setAnswers(value: Array<Answer>) {
    this.answers = value;
  }

}
