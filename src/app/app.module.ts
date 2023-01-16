import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StagiaireFilterComponent } from './stagiaires/components/stagiaire-filter/stagiaire-filter.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { InitialsPipe } from './shared/pipes/initials.pipe';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { BubbleDirective } from './shared/directives/bubble.directive';
import { HttpClientModule } from '@angular/common/http';
import { StagiaireFormComponent } from './stagiaires/components/stagiaire-form/stagiaire-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PoeFormComponent } from './core/poes/components/poe-form/poe-form.component';
import { PoeTableComponent } from './core/poes/components/poe-table/poe-table.component';
import { PoeFilterComponent } from './core/poes/components/poe-filter/poe-filter.component';
import { LoginFormComponent } from './user/login/login-form/login-form.component';
import { UserModule } from './user/user.module';
import { AppInitService } from './app-init.service';
import { LocalStrategy } from './core/strategies/storage/local-strategy';
import { UserService } from './user/services/user.service';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './user/components/user-form/user-form.component';
import { HttpInterceptorService } from './user/services/http-interceptor.service';
import { PoeDetailsComponent } from './core/poes/components/poe-details/poe-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteTraineeFromPoeDialogComponent } from './core/dialogs/delete-trainee-from-poe-dialog/delete-trainee-from-poe-dialog.component';
import { ClearTraineesFromPoeDialogComponent } from './core/dialogs/clear-trainees-from-poe-dialog/clear-trainees-from-poe-dialog.component';

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    StagiaireTableComponent,
    StagiaireFilterComponent,
    InitialsPipe,
    StagiaireDetailComponent,
    BubbleDirective,
    StagiaireFormComponent,
    PoeFormComponent,
    PoeTableComponent,
    PoeFilterComponent,
    PoeDetailsComponent,
    DeleteTraineeFromPoeDialogComponent,
    ClearTraineesFromPoeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    MatDialogModule
  ],
  providers: [
    AppInitService,
    { provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [AppInitService], multi: true },
    LocalStrategy,
    UserService,
    HttpInterceptorService
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
