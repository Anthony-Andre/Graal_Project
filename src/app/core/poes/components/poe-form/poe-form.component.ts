import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Poe } from 'src/app/core/models/poe';
import { PoeService } from 'src/app/core/services/poe.service';
import { StagiaireDto } from 'src/app/stagiaires/dto/stagiaire-dto';
import { PoeDto } from '../../dto/poe-dto';

@Component({
  selector: 'app-poe-form',
  templateUrl: './poe-form.component.html',
  styleUrls: ['./poe-form.component.scss']
})
export class PoeFormComponent implements OnInit {

  poe: Poe = new Poe();
  poeToUpdate: Poe = new Poe();
  public poes: Array<Poe> = [];

  poeForm!: FormGroup;

  dateFormat: string = 'FR-fr';

  public addMode: boolean = true;

  constructor(
    private poeService: PoeService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {

    const data: any = this.route.snapshot.data;
    console.log(`${data.form instanceof FormGroup ? 'OK' : 'KO'}`);
    this.poeForm = data.form;

    this.poeService.findAll().subscribe((poes: Poe[]) => {
      this.poes = poes;
    })


    if (this.poeForm.value.id !== 0 && this.poeForm.value.id !== undefined) {
      this.addMode = false;
      console.log('id =', this.poeForm.value.id);
    } else {
      this.addMode = true;
      console.log('id =', this.poeForm.value.id);
    }
  }

  /**
 * Returns a list of form controls
 * @usage In template : c['lastname']
 * instead of poeForm.controls['lastname'];
 */

  public get c(): { [key: string]: AbstractControl } {
    return this.poeForm.controls;
  }

  onSubmit() {
    console.log('Delegate add poe: ', this.poeForm.value);

    const dto: PoeDto = new PoeDto(this.poeForm.value);

    let subscription: Observable<any>;

    if (this.addMode) {
      subscription = this.poeService.addPoe(dto);
    } else {
      subscription = this.poeService.update(this.poeForm.value);
    }

    subscription.subscribe(() => this.goHome())
  }

  public goHome(): void {
    this.location.back();
  }

}

