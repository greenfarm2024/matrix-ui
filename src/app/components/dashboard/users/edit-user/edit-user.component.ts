import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../../../../services/user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  sex: string[] = ['Male', 'Female'];
  userIndex: number | null = null;
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      user: [{ value: '', disabled: true }, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sex: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userIndex = Number(params['index']);
      if (!isNaN(this.userIndex)) {
        this.loadUserData();
      } else {
        this.handleUserNotFound();
      }
    });
  }

  loadUserData(): void {
    if (this.userIndex !== null) {
      this.user = this.userService.getUserByIndex(this.userIndex);
      if (this.user) {
        this.form.patchValue(this.user);
      } else {
        this.handleUserNotFound();
      }
    }
  }

  editUser(): void {
    if (this.form.valid && this.userIndex !== null) {
      const updatedUser: User = { ...this.user, ...this.form.getRawValue() };
      this.userService.updateUser(this.userIndex, updatedUser);
      this.router.navigate(['/dashboard/users']);
      this.snackBar.open('The user was successfully updated', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

  private handleUserNotFound(): void {
    this.snackBar.open('User not found', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.router.navigate(['/dashboard/users']);
  }
}
