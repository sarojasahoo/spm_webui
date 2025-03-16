import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private tokenValidationUrl = environment.apiEndpoints.tokenValidation;

  constructor(private router: Router, private http: HttpClient) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return of(this.router.createUrlTree(['/login']));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.tokenValidationUrl, { headers })
      .pipe(
        map(response => {
          // if the response is valid, return true; otherwise, redirect to login
          return !!response || this.router.createUrlTree(['/login']);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Token validation error:', error);
          return of(this.router.createUrlTree(['/login']));
        })
      );
  }
}
