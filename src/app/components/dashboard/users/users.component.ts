import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDTO } from '../../../dto/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  loading = false;
  listUsers: UserDTO[] = [];
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'sex', 'actions'];
  dataSource = new MatTableDataSource<UserDTO>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.loading = true;
    this._userService.getAllUsers().subscribe({
      next: (res: UserDTO[]) => {
        this.listUsers = res;
        this.dataSource.data = res;
        // Assign paginator and sort after data is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  deleteUser(index: number) {
    this._userService.deleteUser(index);
    this.getAllUsers;

    this._snackBar.open('The user was successfully deleted', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  viewUser(index: number) {
    this.router.navigate(['/dashboard/view-user'], { queryParams: { index } });
  }


  editUser(index: number): void {
    this.router.navigate(['/dashboard/edit-user'], { queryParams: { index } });
  }

}
