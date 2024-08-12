import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDTO } from '../../../../dto/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  loading = false;
  sex: string[] = ['Male', 'Female', 'Other'];
  form!: FormGroup;
  errorMessage = '';

  @Output() userAdded = new EventEmitter<UserDTO>();

  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar) {
      this.form = this.fb.group({
        userName: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        sex: ['', Validators.required],
      });
  }

  ngOnInit(): void {
  }

  addUser(): void {
    if (this.form.valid) {
      this.loading = true;
      const newUser: UserDTO = this.form.value;

      this._userService.addUser(newUser).subscribe({
        next: (addedUser) => {
          this.loading = false;
          this._snackBar.open('User added successfully!', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.userAdded.emit(addedUser);  // Emit event to notify parent component
          this.router.navigate(['/dashboard/users']);
        },
        error: (err) => {
          this.loading = false;
          this._snackBar.open('Failed to add user: ' + err.message, '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      });
    }
  }
  

  onCancel(): void {
    this.router.navigate(['/dashboard/users']); // Navigate to the user list or dashboard
  }

}
