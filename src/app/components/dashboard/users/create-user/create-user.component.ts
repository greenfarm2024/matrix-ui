import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  isEditMode = false;
  @Input() user!: UserDTO;  // Optional, if passed, it indicates edit mode

  oldUser!: UserDTO;

  @Output() userAddedOrUpdated = new EventEmitter<UserDTO>();

  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) {
      this.form = this.fb.group({
        userName: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        sex: ['', Validators.required],
      });
  }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.queryParamMap.get('userId');
    if (userId) {
      this.isEditMode = true;
      this.loadUserData(userId);
    }
  }

  private loadUserData(userId: string): void {
    this.loading = true;
    this._userService.fetchUserById(userId).subscribe({
      next: (user: UserDTO) => {
        this.form.patchValue(user);
        this.loading = false;
        this.oldUser = user;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this._snackBar.open('Failed to load user data: ' + err.message, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      this.loading = true;
      const userData: UserDTO = this.form.value;

      if (this.isEditMode) {
        userData.userId = this.oldUser.userId; // Set the userId for update operation
        console.log('userData: ', userData);
        this.updateUser(userData);
      } else {
        this.addUser(userData);
      }
    }
  }

  private updateUser(user: UserDTO): void {
    this._userService.updateUser(user).subscribe({
      next: (updatedUser) => {
        this.loading = false;
        this._snackBar.open('User updated successfully!', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.userAddedOrUpdated.emit(updatedUser);
        this.router.navigate(['/dashboard/users']);
      },
      error: (err) => {
        this.loading = false;
        this._snackBar.open('Failed to update user: ' + err.message, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }


  private addUser(user: UserDTO): void {
    this._userService.addUser(user).subscribe({
      next: (addedUser) => {
        this.loading = false;
        this._snackBar.open('User added successfully!', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.userAddedOrUpdated.emit(addedUser); // emit event to nitify parent component
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
  
  onCancel(): void {
    this.router.navigate(['/dashboard/users']); // Navigate to the user list or dashboard
  }

}
