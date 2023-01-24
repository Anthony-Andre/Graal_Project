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
import { LoginFormComponent } from './user/components/login-form/login-form.component';
import { UserModule } from './user/user.module';
import { AppInitService } from './app-init.service';
import { LocalStrategy } from './core/strategies/storage/local-strategy';
import { UserService } from './user/services/user.service';
import { FormsModule } from '@angular/forms';
import { SignupFormComponent } from './user/components/signup-form/signup-form.component';
import { HttpInterceptorService } from './user/services/http-interceptor.service';
import { PoeDetailsComponent } from './core/poes/components/poe-details/poe-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteTraineeFromPoeDialogComponent } from './core/dialogs/delete-trainee-from-poe-dialog/delete-trainee-from-poe-dialog.component';
import { ClearTraineesFromPoeDialogComponent } from './core/dialogs/clear-trainees-from-poe-dialog/clear-trainees-from-poe-dialog.component';
import { SurveyFormComponent } from './survey/components/survey-form/survey-form.component';
import { DeletePoeDialogComponent } from './core/dialogs/delete-poe-dialog/delete-poe-dialog.component';
import { DeleteTraineeDialogComponent } from './core/dialogs/delete-trainee-dialog/delete-trainee-dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { SurveyTableComponent } from './survey/components/survey-table/survey-table.component';
import { DeleteSurveyDialogComponent } from './survey/components/dialogs/delete-survey-dialog/delete-survey-dialog.component';
import { SurveyMatDialogComponent } from './survey/components/survey-mat-dialog/survey-mat-dialog/survey-mat-dialog.component';
import { SurveyFilterComponent } from './survey/components/survey-filter/survey-filter.component';
import { TraineeSurveyComponent } from './survey/components/trainee-survey/trainee-survey.component';
import { SendSurveyDialogComponent } from './core/dialogs/send-survey-dialog/send-survey-dialog.component';
import { QuestionTableComponent } from './question/components/question-form/question-table/question-table/question-table.component';
import { MessageAnswerComponent } from './answer/components/message-answer/message-answer.component';



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
    ClearTraineesFromPoeDialogComponent,
    SurveyFormComponent,
    DeletePoeDialogComponent,
    DeleteTraineeDialogComponent,
    SurveyTableComponent,
    DeleteSurveyDialogComponent,
    SurveyMatDialogComponent,
    SurveyFilterComponent,
    TraineeSurveyComponent,
    SendSurveyDialogComponent,
    QuestionTableComponent,
    MessageAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    MatDialogModule,
    FormsModule,
    MatStepperModule

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
