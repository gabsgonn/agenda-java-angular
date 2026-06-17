import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarefa } from '../../models/tarefa-model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private apiUrl = `${environment.apiUrl}/api/tasks`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  updateStatus(id: number, status: string): Observable<Tarefa> {
    const statusNovo = { status };
    return this.http.patch<Tarefa>(`${this.apiUrl}/${id}/status`, statusNovo);
  }
}
