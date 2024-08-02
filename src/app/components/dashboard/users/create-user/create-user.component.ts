import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  sex: any[] = ['Male', 'Female'];
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sex: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  addUser() {
    const user: User = {
      user: this.form.value.user,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      sex: this.form.value.sex
    }
    this._userService.addUser(user);
    this.router.navigate(['/dashboard/users']);
    this._snackBar.open('The user was successfully added', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
