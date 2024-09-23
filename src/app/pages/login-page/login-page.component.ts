import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  userName: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private _userService: UserService) {
    this.form = this.fb.group({
      user: ['user', Validators.required],
      password: ['user', Validators.required]
    });
  }

  ngOnInit() {
  }

  login(): void {
    this.loading = true;
    this._userService.login(this.form.value.user, this.form.value.password).subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          localStorage.setItem('token', response.token)
          localStorage.setItem('role', response.role)
          this.router.navigate(['/dashboard']);
        } else {
          this.error();
          this.form.reset();
        }
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.status === 0) {
          this.errorMessage = 'Connection refused: Unable to reach the server.';
          this.error();
        } else {
          this.errorMessage = 'Error fetching users: ' + err.message;
          this.error();
        }
      }
    });
  }

  error() {
    this._snackBar.open(this.errorMessage, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
