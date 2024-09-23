import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDTO } from '../../../entities/user';
import { ErrorHandlerService } from '../../../services/ErrorHandlerService';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.css']
})
export class CreateUserComponent implements OnInit {
  loading = false;
  sex: string[] = ['Male', 'Female', 'Other'];
  roles: string[] = ['ADMIN', 'USER'];
  groupes: string[] = ['C', 'G', 'S', 'M', 'U'];
  form!: FormGroup;
  errorMessage = '';
  userId: any;

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
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });

    if (this.userId) {
      this.getUserById(this.userId);
    } else {
      this.initializeForm();
    }
  }

  getUserById(userId: string): void {
    this.loading = true;
    const token: any = localStorage.getItem('token');
    this.userService.getUserById(token, userId).subscribe({
      next: (res: any) => {
        this.oldUser = res;
        this.loading = false;
        // Proceed only after user data is fetched
        this.initializeForm();
        this.isEditMode = true;
        this.form.patchValue(this.oldUser);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.status === 0) {
          this.errorMessage = 'Connection refused: Unable to reach the server.';
        } else {
          this.errorMessage = 'Error fetching users: ' + err.message;
        }
      }
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      userId: [''],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      groupe: ['', Validators.required],
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
      this.register(user);
    }
  }

  private register(user: UserDTO): void {
    const token: any = localStorage.getItem('token');
    this.userService.register(token, user).subscribe({
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
    const token: any = localStorage.getItem('token');
    this.userService.updateUser(token, user).subscribe({
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