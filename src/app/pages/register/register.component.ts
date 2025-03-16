import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ Import Router for navigation
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      active: [true] // Default value
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = "❌ Please fill in all required fields correctly.";
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.auth.registerUser( this.registerForm.value).subscribe({
      next: (response) => {
        this.successMessage = "✅ User registered successfully!";
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = "❌ Registration failed. Please try again.";
      }
    });
  }


  ngOnInit(): void {
  }

onCancel(): void {
 this.router.navigate(['/login']);
  }
}
