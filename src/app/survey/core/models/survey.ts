import { Level } from "src/app/core/enums/level";
import { PoeType } from "src/app/core/enums/poe-type";

export class Survey {
    private id: number = 0;
    private title: string = "";
    private poeType!: PoeType;
    private level!: Level;
    


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


   
}
