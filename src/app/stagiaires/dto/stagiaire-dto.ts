import { Poe } from "src/app/core/models/poe";
import { Stagiaire } from "src/app/core/models/stagiaire";

export class StagiaireDto {
  // Changegit
  public id?: number;
  public lastname: string = '';
  public firstname: string = '';
  public email: string = '';
  public phoneNumber: string = '';
  public birthdate!: Date;
  public poe_id!: number;

  public constructor(formValues: any) {
    Object.assign(this, formValues);
  }

  // public toStagiaire(): Stagiaire {
  //   const stagiaire: Stagiaire = new Stagiaire();
  //   if (this.id !== undefined) {
  //     stagiaire.setId(this.id);
  //   }
  //   stagiaire.setLastName(this.lastname);
  //   stagiaire.setFirstName(this.firstname);
  //   stagiaire.setEmail(this.email);
  //   stagiaire.setPhoneNumber(this.phoneNumber);
  //   stagiaire.setBirthDate(this.birthdate);

  //   return stagiaire;
  // }

}
