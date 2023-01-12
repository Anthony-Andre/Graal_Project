import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Poe } from 'src/app/core/models/poe';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { PoeService } from 'src/app/core/services/poe.service';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';

@Component({
  selector: 'app-poe-details',
  templateUrl: './poe-details.component.html',
  styleUrls: ['./poe-details.component.scss']
})

export class PoeDetailsComponent implements OnInit {

  // @Input() stagiaire: Stagiaire | null = new Stagiaire();
  @Input() poe: Poe | null = new Poe();
  trainees: Array<Stagiaire> = [];

  // @Output() public changeVisibility: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  // @Output() public onChangeState: EventEmitter<Stagiaire | null> = new EventEmitter<Stagiaire | null>();

  public bubbleConfig: any = {
    backgroundColor: 'rgba(189, 58, 58, 0.651)',
    color: '#fff',
    border: 'solid 2px rgb(2, 222, 45)'
  }

  constructor(
    private handleDetailService: HandleDetailService,
    private route: ActivatedRoute,
    private stagiaireService: StagiaireService,
    private poeService: PoeService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((routeParams: Params) => {
        console.log('Routes params ', JSON.stringify(routeParams));
        const poeId: number = routeParams['id'];
        console.log('Id from route = ', poeId);
        this.poeService.findOne(poeId)
          .subscribe((poe: Poe) => {
            this.poe = poe;
            poe.getTrainees().map((anyTrainee: any) => {
              const stagiaire: Stagiaire = new Stagiaire();
              stagiaire.setId(anyTrainee.id);
              stagiaire.setBirthDate(new Date(anyTrainee.birthdate));
              stagiaire.setEmail(anyTrainee.email);
              stagiaire.setPhoneNumber(anyTrainee.phoneNumber);
              stagiaire.setLastName(anyTrainee.lastname);
              stagiaire.setFirstName(anyTrainee.firstname);
              console.log("map stagiaire : ", stagiaire instanceof Stagiaire);
              this.trainees.push(stagiaire);
              console.log("trainees2", this.trainees);
              return stagiaire;
            }

            )
          });
      })
  }

  public changePoe(poe: Poe) {
    this.poe = poe;
  }



  public closePoeCard() {
    this.handleDetailService.setIsDetailHidden(true);
  }

  public deleteTraineeFromPoe() {

  }

}
