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
    console.log(`${data.form instanceof FormGroup ? 'OK' : 'KO'}`);
    this.stagiaireForm = data.form;

    if (this.stagiaireForm.value.id !== 0 && this.stagiaireForm.value.id !== undefined) {
      this.addMode = false;
      console.log('id =', this.stagiaireForm.value.id);
    } else {
      this.addMode = true;
      console.log('id =', this.stagiaireForm.value.id);
    }

    this.poeService.findAll().subscribe((poes: Poe[]) => {
      this.poes = poes;

    })



    //   if (this.router.url.includes("update")) {
    //     this.addMode = false;
    //     this.route.params
    //       .subscribe((routeParams: Params) => {
    //         const stagiaireId: number = routeParams['id'];
    //         this.stagiaireService.findOne(stagiaireId)
    //           .subscribe((stagiaire: Stagiaire) =>
    //             // this.stagiaireToUpdate = stagiaire
    //             this.stagiaireForm = this.formBuilderService.build(stagiaire).getForm()
    //           );
    //       })
    //   } else {
    //     this.stagiaireForm = this.formBuilderService.build(new Stagiaire()).getForm();
    //   }
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
    console.log('Delegate add stagiaire: ', this.stagiaireForm.value);
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


