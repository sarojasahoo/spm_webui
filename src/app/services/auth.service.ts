
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenDto } from 'src/app/model/token.dto';

export interface LoginPayload {
  userId: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    // Update this URL to match your backend authentication endpoint.
    private loginUrl = environment.apiEndpoints.login;
    private logoutUrl = environment.apiEndpoints.logout;
    private registerUrl = environment.apiEndpoints.register;
    
    constructor(private http: HttpClient) {}


   login(payload: LoginPayload): Observable<TokenDto> {
      return this.http.post<TokenDto>(this.loginUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
        }).pipe(
        map((response: TokenDto) => response) // Enforce return type
        );
    }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }
  logout(): Observable<void> {
  return this.http.post<void>(this.logoutUrl, {}, { withCredentials: true }).pipe(
    tap(() => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    })
  );
}

  
  private handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // A client-side error occurred.
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
  }



  getLoggedInUserId(): string | null {
    return localStorage.getItem('userId');
  }

  saveUserId(userId: string): void {
    localStorage.setItem('userId', userId);   
  }
  saveUserName(userName: string): void {
    localStorage.setItem('userName', userName);
  }
  getUserName(): string | null {
    return localStorage.getItem('userName');
  }
}
