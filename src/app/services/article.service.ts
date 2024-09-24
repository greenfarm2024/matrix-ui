import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleDTO } from '../entities/article';

const baseUrl = `${environment.apiUrl}article/`;

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private readonly http: HttpClient) { }

  
  getAllArticle(token: string): Observable<Array<ArticleDTO>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Array<ArticleDTO>>(`${baseUrl}getallarticles`, { headers });
  }
}
