import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { appendFile } from 'fs';
import { emit } from 'process';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';

@Component({
  selector: 'app-stagiaire-detail',
  templateUrl: './stagiaire-detail.component.html',
  styleUrls: ['./stagiaire-detail.component.scss']
})
export class StagiaireDetailComponent implements OnInit {

  @Input() stagiaire: Stagiaire | null = new Stagiaire();
  // @Output() public changeVisibility: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  // @Output() public onChangeState: EventEmitter<Stagiaire | null> = new EventEmitter<Stagiaire | null>();

  public changeView: boolean = false;
  public bubbleConfig: any = {
    backgroundColor: 'rgba(189, 58, 58, 0.651)',
    color: '#fff',
    border: 'solid 2px rgb(2, 222, 45)'
  }

  public toInfos(): void {
    this.changeView = false;
  } 

  public toReponses(): void {
    this.changeView = true;
  }

  constructor(
    private handleDetailService: HandleDetailService,
    private route: ActivatedRoute,
    private stagiaireService: StagiaireService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((routeParams: Params) => {
        console.log('Routes params ', JSON.stringify(routeParams));
        const stagiaireId: number = routeParams['id'];
        console.log('Id from route = ', stagiaireId);
        this.stagiaireService.findOne(stagiaireId)
          .subscribe((stagiaire: Stagiaire) =>
            this.stagiaire = stagiaire
          )
      })
  }

  public changeStagiaire(stagiaire: Stagiaire) {
    this.stagiaire = stagiaire;
  }

  public closeStagiaireCard() {
    this.handleDetailService.setIsDetailHidden(true);
  }

}
