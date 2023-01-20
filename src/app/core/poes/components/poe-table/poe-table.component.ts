import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { time } from 'console';
import { DeletePoeDialogComponent } from 'src/app/core/dialogs/delete-poe-dialog/delete-poe-dialog.component';
import { Poe } from 'src/app/core/models/poe';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { PoeService } from 'src/app/core/services/poe.service';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { AuthService } from 'src/app/user/services/auth-service.service';
import { GreetingService } from 'src/app/user/services/greeting.service';

@Component({
  selector: 'app-poe-table',
  templateUrl: './poe-table.component.html',
  styleUrls: ['./poe-table.component.scss']
})
export class PoeTableComponent implements OnInit {


  isSignedin = false;

  signedinUser: string = '';

  greeting: any[] = [];

  public poes: Array<Poe> = [];
  public stagiaires: Array<Stagiaire> = [];
  public stopDate: String | null = null;
  public dateOfTheDay: string = new Date().getFullYear() + "," + (new Date().getMonth() + 1) + "," + (new Date().getDate() + 1);
  public hasUser: boolean = this.authService.isUserSignedin();
  public nbStagiaires!: number;
  public confirmation: string = "false";
  public croissantEndDate: boolean = false;
  public croissantTitle: boolean = false;


  constructor(
    private poeService: PoeService,
    private stagiaireService: StagiaireService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private greetingService: GreetingService,
    private dialog : MatDialog) { }

  ngOnInit(): void {
    this.poeService.findAll().subscribe((poes: Poe[]) => {
      this.poes = poes;

    })


    this.isSignedin = this.authService.isUserSignedin();
    this.signedinUser = this.authService.getSignedinUser();

    if (!this.authService.isUserSignedin()) {
      this.router.navigateByUrl('signin');
    }

    if (this.isSignedin) {
      this.greetingService.getByUserRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/user - You are not authorize'));
      this.greetingService.getByAdminRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/admin - You are not authorized'));
      this.greetingService.getByUserOrAdminRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/userOrAdmin - You are not authorized'));
    }

  }

  public doSignout() {
    this.authService.signout();
  }

  public onClick(poe: Poe): void {
    this.router.navigate(['/', 'poe', poe.getId()])
  }

  public onRemove(poe: Poe): void {
    console.log(`L'utilisateur souhaite supprimer ${poe.getTitle()}`);
    if (this.confirmation === "true") {
      this.poeService.delete(poe).subscribe({
        next: (response: HttpResponse<any>) => { },
        error: (error: any) => { },
        complete: () => {
          this.poes.splice(
            this.poes.findIndex((p: Poe) => p.getId() === poe.getId()),
            1
          )
        }
      });
    }    
  }

  public onRemovePoeDialog(poe: Poe): void {
    const dialogRef = this.dialog.open(DeletePoeDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.confirmation = result;
      this.onRemove(poe);
    })
  }

  public onUpDate(poe: Poe): void {
    console.log(`L'utilisateur souhaite modifier ${poe.getTitle()}`);
    console.log(poe);
    this.router.navigate(['/', 'poe', 'update', poe.getId()]);
  }

  public onMail(poe: Poe): void {
    console.log(`L'utilisateur souhaite envoyer un mail à tous les stagiaires de la poe ${poe.getTitle()}`);
    this.poeService.mailToTrainees(poe);
  }

  public filterChanged(event: String | null): void {
    console.log(`Filter has changed to : ${event}`);
    this.stopDate = event;
  }

  public changeView(poe: Poe): boolean {
    // const date: Date = new Date();
    // const diff: number = Math.floor(date.getTime() - poe.getEndDate().getTime());

    if (this.stopDate === null) {
      return true;
    }
    if (this.stopDate === "oneMonth" && (new Date(poe.getEndDate()) < new Date(this.dateOfTheDay))) {
      console.log("Date du jour: ", new Date());
      console.log("Date de la POE : ", poe.getEndDate());
      console.log(this.dateOfTheDay);

      return this.getDayDiff(new Date(this.dateOfTheDay), new Date(poe.getEndDate())) > 31 && this.getDayDiff(new Date(this.dateOfTheDay), new Date(poe.getEndDate())) < 179;
    }
    if (this.stopDate === "sixMonth") {
      return this.getDayDiff(new Date(this.dateOfTheDay), new Date(poe.getEndDate())) > 180 && this.getDayDiff(new Date(this.dateOfTheDay), new Date(poe.getEndDate())) < 364;
    }
    return this.getDayDiff(new Date(this.dateOfTheDay), new Date(poe.getEndDate())) > 365;
  }

  public getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
  }

  public tousLesStagiaires(): number {
    this.nbStagiaires = 0;
    for (let poe of this.poes) {
      this.nbStagiaires += poe.getTrainees().length;
    }
    return this.nbStagiaires;
  }

  public moyenneStagiaires(): number {
    return this.tousLesStagiaires() / this.poes.length;
  }

  public sortByEndDate() {
    if (this.croissantEndDate) {
      this.croissantEndDate = false;
    this.poes.sort((a, b) => {
      var endDateTimeA =  Number(new Date(a.getEndDate()));
      var endDateTimeB =  Number(new Date(b.getEndDate()));
        return endDateTimeB - endDateTimeA;
    })
   } else {
    this.croissantEndDate = true;
      this.poes.sort((a, b) => {
        var endDateTimeA =  Number(new Date(a.getEndDate()));
        var endDateTimeB =  Number(new Date(b.getEndDate()));
          return endDateTimeA - endDateTimeB;
    })
  };
}

public sortByTitle() {
  if (!this.croissantTitle) {
    this.croissantTitle = true
    this.poes.sort((a, b) => {
      var nameA = a.getTitle();
      var nameB = b.getTitle();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
      })
  } else {
  this.croissantTitle = false;
  this.poes.sort((a, b) => {
    var nameA = a.getTitle();
    var nameB = b.getTitle();
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

  // public sortByTitle() {
  //   console.log('sort called');
    
  //   function SortArray(x: any, y: any){
  //     return x.getLastName().localeCompare(y.getLastName());
  //   }
  //   return this.poes.sort(SortArray);
  // }

}





