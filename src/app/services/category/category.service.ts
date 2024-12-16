import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = `${environment.url}/categories`

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl)
  }

  getCatetory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`)
  }

  createCategory(dto: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, dto)
  }

  updateCategory(dto: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${dto.id}`, dto)
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.baseUrl}/${id}`)
  }
}
