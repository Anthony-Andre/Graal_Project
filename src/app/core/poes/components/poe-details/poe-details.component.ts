import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { ClearTraineesFromPoeDialogComponent } from 'src/app/core/dialogs/clear-trainees-from-poe-dialog/clear-trainees-from-poe-dialog.component';
import { DeleteTraineeFromPoeDialogComponent } from 'src/app/core/dialogs/delete-trainee-from-poe-dialog/delete-trainee-from-poe-dialog.component';
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
  allTrainees: Array<Stagiaire> = [];
  confirmation: string = "false";

  // @Output() public changeVisibility: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  // @Output() public onChangeState: EventEmitter<Stagiaire | null> = new EventEmitter<Stagiaire | null>();

  public bubbleConfig: any = {
    backgroundColor: 'rgba(189, 58, 58, 0.651)',
    color: '#fff',
    border: 'solid 2px rgb(2, 222, 45)'
  }
  public selectHidden: boolean = false;
  public selectBarMode: boolean = false;

  constructor(
    private handleDetailService: HandleDetailService,
    private route: ActivatedRoute,
    private stagiaireService: StagiaireService,
    private poeService: PoeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((routeParams: Params) => {
        const poeId: number = routeParams['id'];
        this.poeService.findOne(poeId)
          .subscribe((poe: Poe) => {
            this.poe = poe;
            this.poe.getTrainees().map((anyTrainee: any) => {
              const stagiaire: Stagiaire = new Stagiaire();
              stagiaire.setId(anyTrainee.id);
              stagiaire.setBirthDate(new Date(anyTrainee.birthdate));
              stagiaire.setEmail(anyTrainee.email);
              stagiaire.setPhoneNumber(anyTrainee.phoneNumber);
              stagiaire.setLastName(anyTrainee.lastname);
              stagiaire.setFirstName(anyTrainee.firstname);
              this.trainees.push(stagiaire);
              return stagiaire;
            }
            )
          });
      })

    this.stagiaireService.findAll().subscribe((stagiaires: Stagiaire[]) => {
      // this.allTrainees = stagiaires;
      for (const trainee of stagiaires) {
        console.log(trainee.getPoe_Id())
        if (!trainee.getPoe_Id()) {
          this.allTrainees.push(trainee);
        }
      }
    })

  }

  public changePoe(poe: Poe) {
    this.poe = poe;
  }



  public closePoeCard() {
    this.handleDetailService.setIsDetailHidden(true);
  }

  public deleteTraineeFromPo(poe: Poe, stagiaire: Stagiaire) {
    this.poeService.findAll();
    this.poeService.deleteTrainee(poe, stagiaire);
  }


  public deleteTraineeFromPoe(poe: Poe, stagiaire: Stagiaire): void {
    console.log("delete trainee:", stagiaire.getLastName(), "from poe:", poe.getTitle());
    if (this.confirmation === "true") {
      this.poeService.deleteTrainee(poe, stagiaire).subscribe(
        {
          complete: () => {
            this.trainees.splice(
              this.trainees.findIndex((s: Stagiaire) => s.getId() === stagiaire.getId()),
              1
            )
          }
        }
      ); 
    }       
  }

  public addNewTrainee() {
    console.log("L'utilisateur veut ajouter un nouveau stagiaire");

    this.selectHidden = true;
    this.selectBarMode = true;


  }

  public closeSelectBar() {
    this.selectHidden = false;
    this.selectBarMode = false;

  }

  public clearTrainees(poe: Poe): void {
    console.log("L'utilisateur souhaite supprimer la liste des stagiaires de la poe", poe.getTitle());
    if (this.confirmation === "true") {
      this.poeService.clearTrainees(poe).subscribe(
        {
          complete: () => {
            this.trainees.splice(0);
          }
        }
      )
    }    
  }

  public deleteTraineeDialog(poe: Poe, trainee: Stagiaire): void {
    const dialogRef = this.dialog.open(DeleteTraineeFromPoeDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.confirmation = result;
      this.deleteTraineeFromPoe(poe, trainee);        
    });
  }

  public clearTraineesDialog(poe: Poe): void {
    const dialogRef = this.dialog.open(ClearTraineesFromPoeDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.confirmation = result;
      this.clearTrainees(poe);
    });
  }


}
