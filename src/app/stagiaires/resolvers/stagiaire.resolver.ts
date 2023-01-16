import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { timeStamp } from 'console';
import { Observable, of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { FormBuilderService } from '../services/form-builder.service';

@Injectable({
  providedIn: 'root'
})
export class StagiaireResolver implements Resolve<FormGroup> {

  public constructor(
    private route: ActivatedRoute,
    private stagiaireService: StagiaireService,
    private formBuilderService: FormBuilderService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FormGroup> {

    const id: number = +route.paramMap.get('id')!;
    const idPoe: number = +route.paramMap.get('idPoe')!;
    let stagiaire: Stagiaire;
    let form: FormGroup;

    if (id === 0) {
      stagiaire = new Stagiaire();
      form = this.formBuilderService.build(stagiaire).getForm();
      return of(form);
    } else if (idPoe !== 0) {
      console.log("Salut on veut modifier la poe ", idPoe);
      stagiaire = new Stagiaire();
      form = this.formBuilderService.build(stagiaire).getForm();
      return of(form);
    } else {
      return this.stagiaireService.findOne(id)
        .pipe(
          take(1),
          map((oStagiaire: Stagiaire) => {
            return this.formBuilderService.build(oStagiaire).getForm();
          })
        )
    }

  }
}
