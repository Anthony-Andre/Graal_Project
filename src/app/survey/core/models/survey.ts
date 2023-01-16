import { Level } from "src/app/core/enums/level";
import { PoeType } from "src/app/core/enums/poe-type";

export class Survey {
    private id: number = 0;
    private title: string = "";
    private type!: PoeType;
    private level!: Level;
    //private trainees!: Array<Question>;
    


    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getType(): PoeType {
        return this.type;
    }

    public setPoeType(type: PoeType): void {
        this.type = type;
    }

    public getLevel(): PoeType {
        return this.type;
    }

    public setLevel(type: PoeType): void {
        this.type = type;
    }

    //public getQuestions(): Array<Question> {
        //return this.questions;
    //}

    //public setQuestions(questions: Array<Question>): void {
     //   this.questions = questions;
    //}


   
}
