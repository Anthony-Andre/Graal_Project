import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { HttpInterceptorService } from './services/http-interceptor.service';



@NgModule({
  declarations: [
    LoginFormComponent,
    SignupFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ]
})
export class UserModule { }
