import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/models/user';
import { AuthService } from '../user/services/auth-service.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: String = "";

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getSignedinUser();
    console.log(this.user);

  }

  public go(page: string) {
    console.log(page);
    this.router.navigate(['/', page])
  }

}
