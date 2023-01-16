// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-user-form',
//   templateUrl: './user-form.component.html',
//   styleUrls: ['./user-form.component.scss']
// })
// export class UserFormComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Request } from '../../models/request';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  username: string = '';
  password: string = '';

  user_roles: any = [
    { name: 'User', value: 'ROLE_USER', selected: false },
    { name: 'Admin', value: 'ROLE_ADMIN', selected: false },
  ]

  selectedRoles: string[] = [];

  error: string = '';
  success: string = '';

  ngOnInit(): void {
  }

  onChangeCategory(event: any, role: any) {
    this.selectedRoles.push(role.value);
  }

  doSignup() {
    if (this.username !== '' && this.username !== null && this.password !== '' && this.password !== null && this.selectedRoles.length > 0) {
      const request: Request = { userName: this.username, userPwd: this.password, roles: this.selectedRoles };

      this.authService.signup(request).subscribe((result) => {
        //console.log(result);
        //this.success = 'Signup successful';
        this.success = result;
        this.router.navigate(['/', 'signin'])
      }, (err) => {
        //console.log(err);
        this.error = 'Something went wrong during signup';
      });
    } else {
      this.error = 'All fields are mandatory';
    }
  }

}
