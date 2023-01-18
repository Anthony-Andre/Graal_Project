import { Level } from "src/app/core/enums/level";
import { PoeType } from "src/app/core/enums/poe-type";
import { Question } from "src/app/question/core/models/question";

export class Survey {
    private id: number = 0;
    private title: string = "";
    private poeType!: PoeType;
    private level!: Level;
    private questions: Array<Question> = [];
    


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

    public getPoeType(): PoeType {
        return this.poeType;
    }

    public setPoeType(type: PoeType): void {
        this.poeType = type;
    }

    public getLevel(): Level {
        return this.level;
    }

    public setLevel(level: Level): void {
        this.level = level;
    }

    public getQuestions(): Array<Question> {
      return this.questions;
    }
    public setQuestions(value: Array<Question>) {
      this.questions = value;
    }
}
