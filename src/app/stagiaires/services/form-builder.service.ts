import { DatePipe } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Stagiaire } from 'src/app/core/models/stagiaire';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  private form!: FormGroup;
  private stagiaire: Stagiaire = new Stagiaire();
  private updateMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private locale: string
  ) {
    this.locale = 'fr';
    this.adapter.setLocale(this.locale);
  }

  public getForm(): FormGroup {
    return this.form;
  }

  public build(stagiaire: Stagiaire): FormBuilderService {
    this.stagiaire = stagiaire
    if (stagiaire.getId() !== 0) {
      this.updateMode = true;
    }

    console.log("formulaire", this.stagiaire);

    this.form = this.formBuilder.group({
      lastname: [
        this.stagiaire.getLastName(), // Default value,
        [
          Validators.required
        ]
      ],
      firstname: [
        this.stagiaire.getFirstName(),
        [
          Validators.required
        ]
      ],
      email: [
        this.stagiaire.getEmail(),
        [
          Validators.required,
          Validators.email
        ]
      ],
      phoneNumber: [
        this.stagiaire.getPhoneNumber(),
        [
          Validators.required,
          Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
        ]
      ],
      poe_id: [
        this.stagiaire.getPoe_Id()
      ],
      birthdate: [
        this.stagiaire.getBirthDate() !== null ? this.stagiaire.getBirthDate() : ''
      ]
    });

    console.log("après formulaire", this.stagiaire);
    console.log("après formulaire POE", this.stagiaire.getPoe_Id());
    console.log("après formulaire Nom", this.stagiaire.getLastName());



    // Ajoute un contrôle avec la valeur de l'id du Stagiaire 
    // donc .. form.value vaudre {id: 1,...}

    if (this.updateMode) {
      const idControl: AbstractControl = new FormControl(this.stagiaire.getId());
      console.log("stagiaireFromFormBuilder: ", this.stagiaire)
      this.form.addControl('id', idControl);
    }

    return this; // To chain methods
  }
}
