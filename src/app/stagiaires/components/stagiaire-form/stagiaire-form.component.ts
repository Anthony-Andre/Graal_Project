import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router, UrlSegment } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { StagiaireDto } from '../../dto/stagiaire-dto';
import { FormBuilderService } from '../../services/form-builder.service';
import { Location } from '@angular/common';
import { PoeService } from 'src/app/core/services/poe.service';
import { Poe } from 'src/app/core/models/poe';
@Component({
  selector: 'app-stagiaire-form',
  templateUrl: './stagiaire-form.component.html',
  styleUrls: ['./stagiaire-form.component.scss']
})
export class StagiaireFormComponent implements OnInit {


  stagiaire: Stagiaire = new Stagiaire();
  stagiaireToUpdate: Stagiaire = new Stagiaire();
  public poes: Array<Poe> = [];

  stagiaireForm!: FormGroup;

  dateFormat: string = 'FR-fr';

  public addMode: boolean = true;

  constructor(
    private stagiaireService: StagiaireService,
    private formBuilderService: FormBuilderService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private poeService: PoeService
  ) { }

  ngOnInit(): void {

    const data: any = this.route.snapshot.data;
    this.stagiaireForm = data.form;

    if (this.stagiaireForm.value.id !== 0 && this.stagiaireForm.value.id !== undefined) {
      this.addMode = false;
    } else {
      this.addMode = true;
    }

    this.poeService.findAll().subscribe((poes: Poe[]) => {
      this.poes = poes;
    })
  }


  /**
   * Returns a list of form controls
   * @usage In template : c['lastname']
   * instead of stagiaireForm.controls['lastname'];
   */

  public get c(): { [key: string]: AbstractControl } {
    return this.stagiaireForm.controls;
  }

  onSubmit() {
    const dto: StagiaireDto = new StagiaireDto(this.stagiaireForm.value);

    let subscription: Observable<any>;

    if (this.addMode) {
      subscription = this.stagiaireService.addStagiaire(dto);
    } else {
      subscription = this.stagiaireService.update(this.stagiaireForm.value);
    }

    subscription.subscribe(() => this.goHome())
  }

  public goHome(): void {
    // this.router.navigate(['/', 'home'])
    this._location.back();
  }

}


