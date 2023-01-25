import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homedir } from 'os';
import { StagiaireDetailComponent } from './stagiaires/components/stagiaire-detail/stagiaire-detail.component';
import { StagiaireFormComponent } from './stagiaires/components/stagiaire-form/stagiaire-form.component';
import { StagiaireTableComponent } from './stagiaires/components/stagiaire-table/stagiaire-table.component';
import { PoeTableComponent } from './core/poes/components/poe-table/poe-table.component';
import { StagiaireResolver } from './stagiaires/resolvers/stagiaire.resolver';
import { PoeFormComponent } from './core/poes/components/poe-form/poe-form.component';
import { PoeResolver } from './core/resolvers/poe.resolver';
import { LoginFormComponent } from './user/components/login-form/login-form.component';
import { NoUserGuard } from './user/guards/no-user.guard';
import { HasUserGuard } from './user/guards/has-user.guard';
import { SignupFormComponent } from './user/components/signup-form/signup-form.component';
import { PoeDetailsComponent } from './core/poes/components/poe-details/poe-details.component';
import { SurveyFormComponent } from './survey/components/survey-form/survey-form.component';
import { SurveyTableComponent } from './survey/components/survey-table/survey-table.component';
import { SurveyResolver } from './survey/resolver/survey.resolver';
import { TraineeSurveyComponent } from './survey/components/trainee-survey/trainee-survey.component';
import { TraineeSurveyResolver } from './survey/resolver/trainee-survey.resolver';
import { QuestionTableComponent } from './question/components/question-form/question-table/question-table/question-table.component';
import { HasAnonymousGuard } from './user/guards/has-anonymous.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'login', // Redirection vers un autre chemin, ici 'signin' 
      pathMatch: 'full'
    },
    { path: 'signup', component: SignupFormComponent },
    {
      path: 'login',
      component: LoginFormComponent,
      canActivate: [
        NoUserGuard
      ]
    },
    {
      path: 'home',
      component: PoeTableComponent,
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'poe',
      component: PoeTableComponent,
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'poe/:id',
      component: PoeDetailsComponent,
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'poe/update/:id',
      component: PoeFormComponent,
      resolve: { form: PoeResolver },
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'add/poe',
      component: PoeFormComponent,
      resolve: { form: PoeResolver },
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'stagiaire',
      component: StagiaireTableComponent,
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'stagiaire/add',
      component: StagiaireFormComponent,
      resolve: { form: StagiaireResolver },
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'stagiaire/:id',
      component: StagiaireDetailComponent,
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'stagiaire/update/:id',
      component: StagiaireFormComponent,
      resolve: { form: StagiaireResolver },
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'stagiaire/add/:idPoe',
      component: StagiaireFormComponent,
      resolve: { form: StagiaireResolver },
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'survey',
      component: SurveyTableComponent,
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'survey/add',
      component: SurveyFormComponent,
      resolve: { form: SurveyResolver },
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'survey/update/:id',
      component: SurveyFormComponent,
      resolve: { form: SurveyResolver },
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: 'survey/:idSurvey/trainee/:id',
      component: TraineeSurveyComponent,
      resolve: { form: TraineeSurveyResolver }
    },
    {
      path: 'question-table',
      component: QuestionTableComponent,
      canActivate: [
        HasUserGuard,
        HasAnonymousGuard
      ]
    },
    {
      path: '**', // Wild card (Redirige vers le home si l'url n'existe pas) - Toujours mettre en dernier
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ];
}
