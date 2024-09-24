import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleDTO } from '../../entities/article';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css'
})
export class ArticlePageComponent implements OnInit {
  loading = false;
  articleList: ArticleDTO[] = [];
  displayedColumns: string[] = ['articleId', 'clientId', 'skuInt', 'skuExt', 'artNameDe', 'artNameEn', 'artNameTh', 'saleUnit', 
    'salePrice','tva','undelSupp1','undelSupp2','undelSupp3','createdDate','createdBy','lastUpdatedDate','updatedBy'];
  dataSource = new MatTableDataSource<ArticleDTO>();

  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private _liveAnnouncer: LiveAnnouncer,
    private articleService: ArticleService,
    private _snackBar: MatSnackBar,
    private router: Router) {
      this.getAllArticle();
  }

  ngOnInit(): void {
    this.getAllArticle();
    console.log('Article Page', this.articleList);
  }

  getAllArticle(): void {
    this.loading = true;
    const token: any = localStorage.getItem('token');
    this.articleService.getAllArticle(token).subscribe({
      next: (res: ArticleDTO[]) => {
        this.articleList = res;
        this.dataSource.data = res;
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
          this.errorMessage = 'Error fetching articles: ' + err.message;
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
}
