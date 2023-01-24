import { Question } from "src/app/question/core/models/question";

export class Answer {
    private id: number = 0;
    private answer: string = "";
    private question: Question = new Question();

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getText(): string {
        return this.answer;
    }

    public setText(text: string): void {
        this.answer = text;
    }

    public getQuestion(): Question {
        return this.question;
    }

    public setQuestion(question: Question): void {
        this.question = question;
    }
}
