import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../interfaces/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  listUsers: User[] = [
    {user: 'admin', firstName: 'Admin', lastName: 'Admin', sex: 'M'},
    {user: 'migro', firstName: 'Migro', lastName: 'Migro', sex: 'M'},
    {user: 'coop', firstName: 'Coop', lastName: 'Coop', sex: 'F'},
    {user: 'aldi', firstName: 'Aldi', lastName: 'Aldi', sex: 'M'},
    {user: 'migro1', firstName: 'Migro1', lastName: 'Migro1', sex: 'F'},
    {user: 'kaufman', firstName: 'Kaufman', lastName: 'Kaufman', sex: 'M'}
  ];

  displayedColumns: string[] = ['user', 'firstName', 'lastName', 'sex', 'actions'];
  dataSource = new MatTableDataSource(this.listUsers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
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

}
