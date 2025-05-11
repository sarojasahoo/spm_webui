import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
  constructor( private authService: AuthService,
               private router: Router, private fb: FormBuilder) {

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

     this.authService.login(credentials).subscribe({
      next: tokenDto => {
        if (tokenDto) {
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
