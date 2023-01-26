import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Stagiaire } from './core/models/stagiaire';
import { StagiaireService } from './core/services/stagiaire.service';
import { AuthService } from './user/services/auth-service.service';
import { GreetingService } from './user/services/greeting.service';
import { UserService } from './user/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Suivi des POE';
  public hasUser: boolean = this.authService.hasUser().getValue();
  public isUserAnonymous: boolean = false;
  public home: boolean = false;

  public stagiaires: Array<Stagiaire> = this.stagiaireService.getStagiaires();

  public constructor(
    private stagiaireService: StagiaireService,
    private userService: UserService,
    private authService: AuthService,
    private greetingService: GreetingService
  ) { }

  ngOnInit(): void {
    // this.userService.hasUser()
    //   .subscribe((hasUser: boolean) =>
    //     this.hasUser = this.authService.isUserSignedin());
    // this.hasUser = this.authService.isUserSignedin();
    this.authService.hasUser().subscribe((hasUser: boolean) => {
      this.hasUser = hasUser;
      this.isUserAnonymous = this.authService.isUserAnonymous();
      console.log("anonyme: ", this.isUserAnonymous)
    });
  }

  public onLogout(): void {
    // this.userService.logout();
    this.authService.signout();
  }

  public toggleTitle(): void {
    if (this.title === 'Suivi des POE') {
      this.title = 'Hello Angular';
    } else {
      this.title = 'Suivi des POE';
    }
  }

  public addStagiaire(): void {
  }


}
