import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ErrorHandler } from '../error-handling/error-handler';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authState = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.authState.asObservable();

  constructor(
    private errorHandler: ErrorHandler,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.authState.next(!!localStorage.getItem('userEmail'));
    }
  }

  login(email: string, password: string) {
    return of({ success: !!(email && password) }).pipe(
      tap(res => {
        if (res.success) {
          localStorage.setItem('userEmail', email);
          this.authState.next(true);
          this.router.navigate(['']);
        }
      }),
      catchError(err => {
        this.errorHandler.handleError(err);
        return throwError(() => err);
      })
    );
  }

  setUser(email: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userEmail', email);
      this.authState.next(true);
      this.router.navigate(['']);
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userEmail');
      this.authState.next(false);
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('userEmail');
  }

  getCurrentUser(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('userEmail') : null;
  }
}