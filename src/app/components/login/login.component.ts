// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';
 
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   credentials = { email: '', password: '' };
//   errorMessage = '';
 
//   constructor(private authService: AuthService, private router: Router) {}
 
//   login() {
//     this.authService.login(this.credentials).subscribe({
//       next: (response) => {
//         localStorage.setItem('token', response.token);
//         this.router.navigate(['/dashboard']);
//       },
//       error: () => {
//         this.errorMessage = 'Invalid email or password!';
//       }
//     });
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
 
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
this.loginForm = this.fb.group({
email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
 
  onSubmit() {
    if (this.loginForm.valid) {
this.http.post('https://localhost:7184/api/Login/login', this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log('Login successful', res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }
}