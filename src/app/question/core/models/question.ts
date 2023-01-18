import { AnswerType } from "src/app/core/enums/AnswerType";

export class Question {
    private id: number = 0;
    private text: string = "";
    private answerType!: AnswerType;
    private answerProposed!: Array<String>;
    
    
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getText(): string {
        return this.text;
    }

    public setText(text: string): void {
        this.text = text;
    }

    public getAnswerType(): AnswerType {
        return this.answerType;
    }

    public setAnswerType(answerType: AnswerType): void {
        this.answerType = answerType;
    }

    public getAnswerProposed(): Array<String> {
      return this.answerProposed;
    }
    public setAnswerProposed(value: Array<String>) {
      this.answerProposed = value;
    }
}
