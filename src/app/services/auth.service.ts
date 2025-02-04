import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7184/api'; // Change this to your backend URL
 
  constructor(private http: HttpClient) {}
 
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/UserRegister/register`, userData);
  }
 
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login/login`, credentials);
  }
 
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
 
  logout(): void {
    localStorage.removeItem('token');
  }
}
 