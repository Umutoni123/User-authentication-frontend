import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  get password() {
    return this.registerForm.get('password')?.value;
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword')?.value;
  }
  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    console.log("Submit button clicked"); // 🔍 Debugging Log
    console.log("Form status:", this.registerForm.status); // 🔍 Check if form is valid/invalid
    console.log("Form values:", this.registerForm.value); // 🔍 Check current form data
  
    if (this.registerForm.valid && this.passwordsMatch()) {
      const {name, email, password} = this.registerForm.value;

      this.authService.register({name, email, password}).subscribe(
        {next: (response) =>{
          alert("Registration successfully!");
          this.router.navigate(['/login']);},
          error: (error: HttpErrorResponse)=> {
            console.error("Registration failed:", error);
            alert(error.error?.message || "Registration failed!");
          }
        }
        
      )
      
    }  else {
      console.log("Invalid form");
      alert("Please fill in all fields correctly!");
    }
  }

}
