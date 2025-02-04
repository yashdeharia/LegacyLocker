// // // import { Component } from '@angular/core';

// // // @Component({
// // //   selector: 'app-register',
// // //   templateUrl: './register.component.html',
// // //   styleUrls: ['./register.component.css']
// // // })
// // // export class RegisterComponent {

// // // }


// // import { Component } from '@angular/core';
// // import { AuthService } from '../../services/auth.service';
// // import { Router } from '@angular/router';
 
// // @Component({
// //   selector: 'app-register',
// //   templateUrl: './register.component.html',
// //   styleUrls: ['./register.component.css']
// // })
// // export class RegisterComponent {
// //   user = { name: '', email: '', password: '' };
// //   errorMessage = '';
 
// //   constructor(private authService: AuthService, private router: Router) {}
 
// //   register() {
// //     this.authService.register(this.user).subscribe({
// //       next: (response) => {
// //         alert('Registration successful! Please log in.');
// //         this.router.navigate(['/login']);
// //       },
// //       error: (err) => {
// //         this.errorMessage = 'Registration failed. Please try again.';
// //       }
// //     });
// //   }
// // }

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
 
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   registerForm: FormGroup;
 
//   constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
// this.registerForm = this.fb.group({
//       name: ['', Validators.required],
// email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }
 
//   onSubmit() {
//     if (this.registerForm.valid) {
// this.http.post('https://localhost:7184/api/UserRegister/register', this.registerForm.value).subscribe({
//         next: (res) => {
//           console.log('Registration successful', res);
//           this.router.navigate(['/login']);
//         },
//         error: (err) => {
//           console.error('Registration failed', err);
//         }
//       });
//     }
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
 
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
this.registerForm = this.fb.group({
      name: ['', Validators.required],
email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  onSubmit() {
    if (this.registerForm.valid) {
this.http.post('https://localhost:7184/api/UserRegister/register', this.registerForm.value)
        .subscribe({
          next: (res: any) => {
            console.log('Registration successful:', res);
 
            // ✅ Ensure response contains expected success message
            if (res && res.message === 'User registered successfully') {
              alert('Registration successful!');
              this.router.navigate(['/login']);
            } else {
              alert('Registration failed. Please try again.');
            }
          },
          error: (err) => {
            console.error('Registration failed:', err);
            alert('Registration failed due to server error.');
          }
        });
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}