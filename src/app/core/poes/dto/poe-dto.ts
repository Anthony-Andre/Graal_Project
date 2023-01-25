import { Poe } from "src/app/core/models/poe";
import { PoeType } from "../../enums/poe-type";
import { Stagiaire } from "../../models/stagiaire";

export class PoeDto {
  // Changegit
  public id?: number;
  public title: string = '';
  public beginDate!: Date;
  public endDate!: Date;
  public type!: PoeType;
  public oneMonthMailSent: number = 0;
  public sixMonthMailSent: number = 0;
  public oneYearMailSent: number = 0;


  public constructor(formValues: any) {
    Object.assign(this, formValues);
  }
}