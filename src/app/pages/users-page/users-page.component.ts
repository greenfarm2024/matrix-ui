import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDTO } from '../../entities/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersComponent implements OnInit {
  loading = false;
  userList: UserDTO[] = [];
  displayedColumns: string[] = ['userId', 'userName', 'firstName', 'lastName', 'sex', 'role', 'groupe', 'actions'];
  dataSource = new MatTableDataSource<UserDTO>();

  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.loading = true;
    const token: any = localStorage.getItem('token');
    this._userService.getAllUsers(token).subscribe({
      next: (res: any) => {
        this.userList = res.userList;
        this.dataSource.data = res.userList;
        // Assign paginator and sort after data is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Set the default sort by userId in descending order
  /*   this.sort.sort({ id: 'userId', start: 'desc', disableClear: true });
    this.dataSource.sort = this.sort; */
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.loading = true;
      const token: any = localStorage.getItem('token');
    this._userService.deleteUser(token, userId).subscribe({
      next: () => {
        this.loading = false;
       this.getAllUsers();
        this.userList = this.userList.filter(user => user.userId !== userId);
        this._snackBar.open('The user was successfully deleted', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      error: (err) => {
        this.loading = false;
        this._snackBar.open('Failed to delete user: ' + err.message, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    }); 
    }
  }

  viewUser(index: number) {
    this.router.navigate(['/dashboard/view-user'], { queryParams: { index } });
  }

  editUser(userId: string): void {
    this.router.navigate(['/dashboard/create-user'], { queryParams: { userId } });
  }

}
