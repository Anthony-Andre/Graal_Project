import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = 'http://localhost:8080/';
  public hasUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isUserSignedin());
  public roles: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  signin(request: Request): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'signin', request, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(map((resp) => {
      if (request.stayConnected == false) {
        sessionStorage.setItem('user', request.userName);
        sessionStorage.setItem('token', 'HTTP_TOKEN ' + resp.token);
      } else {
        localStorage.setItem('user', request.userName);
        localStorage.setItem('token', 'HTTP_TOKEN ' + resp.token);
      }
      this.roles = resp.roles;
      this.hasUser$.next(true);
      console.log("login:", this.isUserSignedin());
      console.log("hasUser$", this.hasUser$.getValue());
      console.log("roles:", this.roles);
      return resp;
    }));
  }

  signup(request: Request): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'signup', request, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json' }).pipe(map((resp) => {
      return resp;
    }));
  }

  signout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.hasUser$.next(false);
    console.log("logout: ", this.hasUser$.getValue())
    this.router.navigateByUrl('signin');
  }

  hasUser(): BehaviorSubject<boolean> {
    return this.hasUser$;
  }

  isUserSignedin() {
    if (localStorage.getItem('token') !== null) {
      return localStorage.getItem('token') !== null;
    } else {
      return sessionStorage.getItem('token') !== null;
    }
  }

  isUserAnonymous() : boolean {
    if (this.roles.includes('ROLE_ANONYMOUS')) {return true;}
    return false;
  }

  getSignedinUser() {
    if (localStorage.getItem('token') !== null) {
      return localStorage.getItem('user') as string;
    } else {
      return sessionStorage.getItem('user') as string;
    }

  }

  getToken() {
    if (localStorage.getItem('token') !== null) {
      let token = localStorage.getItem('token') as string;
      return token;
    } else {
      let token = sessionStorage.getItem('token') as string;
      return token;
    }

  }

}