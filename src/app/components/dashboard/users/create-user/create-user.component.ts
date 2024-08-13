import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDTO } from '../../../../dto/user';
import { ErrorHandlerService } from '../../../../services/ErrorHandlerService';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.user) {
      this.isEditMode = true;
      this.oldUser = { ...this.user };
      this.form.patchValue(this.user);
    }
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sex: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const user: UserDTO = this.form.value;

    if (this.isEditMode) {
      this.updateUser(user);
    } else {
      this.addUser(user);
    }
  }

  private addUser(user: UserDTO): void {
    this.userService.addUser(user).subscribe({
      next: (addedUser) => {
        this.loading = false;
        this.snackBar.open('User added successfully!', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.userAddedOrUpdated.emit(addedUser); // emit event to notify parent component
        this.router.navigate(['/dashboard/users']);
      },
      error: (err) => {
        this.loading = false;
        this.errorHandler.handleError(err);
      }
    });
  }

  private updateUser(user: UserDTO): void {
    this.userService.updateUser(user).subscribe({
      next: (updatedUser) => {
        this.loading = false;
        this.snackBar.open('User updated successfully!', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.userAddedOrUpdated.emit(updatedUser); // emit event to notify parent component
        this.router.navigate(['/dashboard/users']);
      },
      error: (err) => {
        this.loading = false;
        this.errorHandler.handleError(err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/users']); // Navigate to the user list or dashboard
  }
}