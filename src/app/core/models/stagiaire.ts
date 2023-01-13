import { PoeService } from "../services/poe.service";
import { Poe } from "./poe";

export class Stagiaire {
    private id: number = 0;
    private firstname: string = "";
    private lastname: string = "";
    private email: string = "";
    private phoneNumber: string = "";
    private birthdate!: Date;
    private poe!: Poe;
    public poe_id: number = 0;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getLastName(): string {
        return this.lastname;
    }

    public setLastName(lastName: string): void {
        this.lastname = lastName;
    }

    public getFirstName(): string {
        return this.firstname;
    }

    public setFirstName(firstName: string): void {
        this.firstname = firstName;
    }

    public getBirthDate(): Date {
        return this.birthdate;
    }

    public setBirthDate(birthdate: Date): void {
        this.birthdate = birthdate;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPoe(): Poe {
        return this.poe;
    }

    // public setPoe(poeid: number): void {
    //     this.poeService.findOne(poeid)
    //         .subscribe((poe: Poe) => {
    //             this.poe = poe;
    //         })
    // }

    public setPoe(poe: Poe): void {
        this.poe = poe;
    }

    public setPoe_Id(poe_id: number): void {
        console.log("poeDuParamSet", poe_id);
        this.poe_id = poe_id;
        console.log("poeDuSet: ", this.poe_id);
    }

    public getPoe_Id(): number {
        console.log("poeDuGet", this.poe_id)
        return this.poe_id;
    }


}

