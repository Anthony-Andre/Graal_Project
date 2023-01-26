import { Component, OnInit } from '@angular/core';
import { appendFile } from 'fs';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTraineeDialogComponent } from 'src/app/core/dialogs/delete-trainee-dialog/delete-trainee-dialog.component';

@Component({
  selector: 'app-stagiaire-table',
  templateUrl: './stagiaire-table.component.html',
  styleUrls: ['./stagiaire-table.component.scss']
})
export class StagiaireTableComponent implements OnInit {

  public stagiaires: Array<Stagiaire> = [];
  public stopDate: Date | null = new Date(1990, 11, 31);
  public stagiaire: Stagiaire | null = null;
  public visibility: Boolean = true;
  public bubbleConfig: any = {
    height: '2.5em',
    width: '2.5em',
    lineHeight: '2.5em', // Equivalent line-height en CSS
    backgroundColor: 'rgba(189, 75, 22, 0.651)',
    color: '#fff',
    borderRadius: '50%',
    border: 'solid 2px #fff',
    fontWeight: 'bold',
    verticalAlign: 'middle',
    textAlign: 'center',
    display: 'inline-block'
  }
  public isDetailHidden$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public selectedStagiaire: Stagiaire | null = null;
  public confirmation: string = "false";
  public croissantLastName: boolean = false;

  constructor(
    private stagiaireService: StagiaireService,
    private handleDetailService: HandleDetailService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.stagiaireService.findAll().subscribe((stagiaires: Stagiaire[]) => {
      this.stagiaires = stagiaires;
            
      console.log(this.stagiaires[0] instanceof Stagiaire);
    })

    this.isDetailHidden$ = this.handleDetailService.isDetailHidden;

  }

  public onRemove(stagiaire: Stagiaire): void {
    console.log(`L'utilisateur souhaite supprimer ${stagiaire.getLastName()}`);
    if (this.confirmation === "true") {
      this.stagiaireService.delete(stagiaire)
      .subscribe({
        next: (response: HttpResponse<any>) => {

          // Here goes the snackbar
        },
        error: (error: any) => {
          // Something went wrong, deal with it
        },
        complete: () => {
          this.stagiaires.splice(
            this.stagiaires.findIndex((s: Stagiaire) => s.getId() === stagiaire.getId()),
            1
          )
        }
      })
    }
    
  }

  public onRemoveTraineeDialog(stagiaire: Stagiaire): void {
    const dialogRef = this.dialog.open(DeleteTraineeDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.confirmation = result;
      this.onRemove(stagiaire);
    })
  }

  public onClick(stagiaire: Stagiaire): void {
    this.router.navigate(['/', 'stagiaire', stagiaire.getId()])
  }

  public onUpdate(stagiaire: Stagiaire): void {
    this.router.navigate(['/', 'stagiaire', 'update', stagiaire.getId()])
  }

  public filterChanged(event: Date | null): void {
    // console.log(`Filter has changed to : ${event}`);
    this.stopDate = event;
    // this.stagiairesBeforeStopDate = this.stagiaireService.getStagiaireBornBefore(this.stopDate)
  }

  public changeView(stagiaire: Stagiaire): boolean {
    if (this.stopDate === null) {
      return true;
    }
    if (this.stopDate.getDate() === 31) {
      return stagiaire.getBirthDate() > this.stopDate;
    }
    return stagiaire.getBirthDate() < this.stopDate;
  }

  // public showStagiaire(stagiaire: Stagiaire) {
  //   if (this.visibility === true) {
  //     this.stagiaire = stagiaire;
  //     this.visibility = false;
  //   }
  // }

  public closeStagiaireCard(hiddenStatus: Boolean): void {
    this.visibility = hiddenStatus;
  }

  public getVisibleStagiaire(): number {
    console.log("date:", this.stopDate)
    console.log("nombre:", this.stagiaireService.getStagiaireBornBefore(this.stopDate).length)
    return this.stagiaireService.getVisibleStagiaireNumber(
      this.stopDate);
  }

  public sortByLastName() {
    // on change l'état pour tri croissant ou décroissant puis on tri les stagiaires par lastNames
    if (!this.croissantLastName) {
      this.croissantLastName = true
      this.stagiaires.sort((a, b) => {
        var nameA = a.getLastName();
        var nameB = b.getLastName();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
        })
    } else {
    this.croissantLastName = false;
    this.stagiaires.sort((a, b) => {
      var nameA = a.getLastName();
      var nameB = b.getLastName();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
      })
    }
  }

}