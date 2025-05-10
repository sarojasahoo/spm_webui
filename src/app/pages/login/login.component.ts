import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService, LoginPayload } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;

  userId: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private http: HttpClient,
              private authService: AuthService, private router: Router, private fb: FormBuilder) {

                this.loginForm = this.fb.group({
                  userId: ['', [Validators.required]],
                  password: ['', [Validators.required]]
                });
   }

  onSubmit() {

    const credentials = {
      userId   : this.loginForm.get('userId')?.value,
      password : this.loginForm.get('password')?.value
    };
    localStorage.setItem('userId', this.loginForm.get('userId')?.value);

     this.authService.login(credentials).subscribe({
      next: tokenDto => {
        if (tokenDto) {
          this.authService.saveToken(tokenDto.access_token.trim());
          this.authService.saveUserId(tokenDto.userId.trim());
          this.authService.saveUserName(tokenDto.userName.trim());
          this.router.navigate(['/dashboard']);

        } else {
          console.error('Token is null or undefined');
        }
      },
      error: error => {
        if (error.status === 401) {
          const errorData = error.error;
          alert(`Login Failed: ${errorData.errorMessage}`);
        }
      }
      });
  }
}
