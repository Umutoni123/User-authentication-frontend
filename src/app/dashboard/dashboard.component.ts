import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  expenses: any[] = [];

  constructor(private authService: AuthService, private router: Router){}

  dashboardForm = new FormGroup({
    reason: new FormControl('', [Validators.required, Validators.minLength(3)]),
    amount: new FormControl('',[Validators.required, Validators.min(1)])
  })

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // ✅ Redirect if not logged in
      return;
    }
    this.fetchExpenses(); 
  }

  addExpense(){
    if(this.dashboardForm.valid){
      const {reason, amount} = this.dashboardForm.value;
      this.authService.addExpenses(this.dashboardForm.value).subscribe({
        next: (response) =>{
          alert("Expenses added")
          this.dashboardForm.reset();
        }
      });
    }
    else{
      console.log("please fill all fields correctly");
      
    }
  }

  fetchExpenses(){
    this.authService.getExpenses().subscribe({
      next: (response) =>{
        this.expenses = response;
      },
      error: (error) =>{
        console.error('error fetching expenses', error);
        
      }
    })
  }

}
