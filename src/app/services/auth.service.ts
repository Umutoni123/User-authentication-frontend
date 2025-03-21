import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData)
  }


  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }


  getUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  getExpenses(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/getallexpenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });  
   
  }
  addExpenses(expenseData: any): Observable<any> {
    const token = localStorage.getItem('token'); // ✅ Get token from localStorage
  return this.http.post(`${this.apiUrl}/addexpense`, expenseData, {
    headers: { Authorization: `Bearer ${token}` }, // ✅ Add token to headers
  });
    
  }

  deleteExpense(expenseId: String): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/deleteexpense/${expenseId}`, {
      headers: {Authorization: `Bearer ${token}`},
    } )

  }
}
