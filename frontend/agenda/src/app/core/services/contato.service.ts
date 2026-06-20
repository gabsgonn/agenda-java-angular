import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from '../../models/contato.model';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private apiUrl = `${environment.apiUrl}/api/contacts`;

  constructor(private http: HttpClient) {}

  obterContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }
}
