// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { UserService } from '../../services/user.service';

// @Component({
//   selector: 'app-login-form',
//   templateUrl: './login-form.component.html',
//   styleUrls: ['./login-form.component.scss']
// })
// export class LoginFormComponent implements OnInit, OnDestroy {

//   public loginForm!: FormGroup;
//   private subscription!: Subscription;


//   constructor(
//     private formBuilder: FormBuilder,
//     private userService: UserService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.loginForm = this.formBuilder.group({
//       userLogin: [
//         '',
//         [
//           Validators.required
//         ]
//       ],
//       userPassword: [
//         '',
//         [
//           Validators.required
//         ]
//       ],
//       stayConnected: [
//         false
//       ]
//     })
//   }

//   ngOnDestroy(): void {
//     if (this.subscription !== undefined) {
//       this.subscription.unsubscribe();
//     }
//   }

//   public onLogin() {
//     this.subscription = this.userService.login(this.loginForm.value)
//       .subscribe((authentificated: boolean) => {
//         if (authentificated) {
//           this.router.navigate(['/', 'home']);
//         } else {
//           this.loginForm.reset();
//         }

//       })
//   }


// }

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from '../../models/request';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  username: string = '';
  password: string = '';
  public hasUser: boolean = false;

  isSignedin = false;

  error: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isSignedin = this.authService.isUserSignedin();

    if (this.isSignedin) {
      this.router.navigateByUrl('home');
    }
  }

  doSignin() {
    if (this.username !== '' && this.username !== null && this.password !== '' && this.password !== null) {
      const request: Request = { userName: this.username, userPwd: this.password };

      this.authService.signin(request).subscribe((result) => {
        //this.router.navigate(['/home']);
        this.router.navigateByUrl('home');
      }, () => {
        this.error = 'Either invalid credentials or some went wrong';
      });
    } else {
      this.error = 'Invalid Credentials';
    }
  }

}