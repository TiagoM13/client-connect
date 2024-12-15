import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './email.model';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = `${environment.url}/emails`

  constructor(private http: HttpClient) { }

  getAllEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(this.baseUrl);
  }

  getEmail(id: string): Observable<Email> {
    return this.http.get<Email>(`${this.baseUrl}/${id}`)
  }

  createEmail(dto: Email): Observable<Email> {
    return this.http.post<Email>(this.baseUrl, dto)
  }

  updateEmail(dto: Email): Observable<Email> {
    return this.http.put<Email>(`${this.baseUrl}/${dto.id}`, dto)
  }

  deleteEmail(id: string): Observable<Email> {
    return this.http.delete<Email>(`${this.baseUrl}/${id}`)
  }
}
