
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    private registerUrl = environment.apiEndpoints.register;
    
    constructor(private http: HttpClient) {}


   login(payload: LoginPayload): Observable<TokenDto> {
      return this.http.post<TokenDto>(this.loginUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false
        }).pipe(
        map((response: TokenDto) => response) // Enforce return type
        );
    }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
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

  // Browser handling this , no need to store it in local storage.
  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

 getToken(): string | null {
    return localStorage.getItem('access_token');
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
