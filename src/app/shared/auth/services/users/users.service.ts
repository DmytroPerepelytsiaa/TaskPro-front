import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';

import { AuthResponse, LoginPayload, RegisterPayload, User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  user$ = new BehaviorSubject<User | null>(null);

  private http = inject(HttpClient);
  private router = inject(Router);

  login$(body: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.baseURL + '/users/login', body);
  }

  register$(body: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.baseURL + '/users/register', body);
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.user$.next(null);
    this.router.navigate(['welcome']);
  }

  getCurrentUser$(): Observable<User> {
    return this.http.get<User>(environment.baseURL + '/users/me')
      .pipe(
        tap((user: User) => this.user$.next(user)),
      );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
