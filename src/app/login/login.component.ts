import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup; 
  
  constructor(private authService: AuthService, private router: Router){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    

  }

submitLogin(){
  console.log('Login form Submitted', this.loginForm.value);
  if(this.loginForm.valid){
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful!', response);
          this.authService.saveToken(response.token);
          this.router.navigate(['/dashboard']);

      },
      error: (err) =>{
        console.error('Logionh failed', err);
        alert(err.erro?.message || 'Login failed Check credentoials');
        
      }
    })
  }
  else{
     console.log('Invalid form');
      alert('Please enter valid email and password.');
  }
  
}
}
