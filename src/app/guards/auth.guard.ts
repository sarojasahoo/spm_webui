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

/**
 * AuthGuard is an Angular guard that checks if the user is authenticated
 * before allowing access to certain routes.
 * It checks for a valid token in local storage and validates it with the server.
 */

export class AuthGuard implements CanActivate {
  private tokenValidationUrl = environment.apiEndpoints.tokenValidation;

  constructor(private router: Router, private http: HttpClient) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    

    return this.http.get(this.tokenValidationUrl, { withCredentials: true })
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
