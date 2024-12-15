import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators"

import { environment } from '@env/environment';
import { Email } from '../email/email.model';
import { Categorie, Client } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.url}/clients`

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  getClient(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  getEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(`${environment.url}/emails`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${environment.url}/categories`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  createClient(dto: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, dto).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  updateClient(dto: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/${dto.id}`, dto).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  deleteClient(id: string): Observable<Client> {
    return this.http.delete<Client>(`${this.baseUrl}/${id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', true);
    return EMPTY
  }
}
