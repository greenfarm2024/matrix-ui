import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Add your initialization logic here
  }

  login() {
    const user = this.form.value.user;
    const password = this.form.value.password;

    if (user === 'admin' && password === 'admin') {
       //redirect to dashboard
     this.fakeLoading();
    } else {
      this.error();
      this.form.reset();
    }
  }

  error() {  
      this._snackBar.open('User or password is invalid', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  
    fakeLoading() {
      this.loading = true;
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);
    }
}
