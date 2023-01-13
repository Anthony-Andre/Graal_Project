import { Level } from "src/app/core/enums/level";
import { PoeType } from "src/app/core/enums/poe-type";

export class SurveyDto {
    public id?: number;
    public title: string = "";
    public type!: PoeType;
    public level!: Level;

    public constructor(formValues: any) {
        Object.assign(this, formValues);
      }
}
