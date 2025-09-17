import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acessorio } from '../models/acessorio';
import { Veiculo } from '../models/veiculo';

@Injectable({
  providedIn: 'root'
})
export class AcessorioService {

  private API_URL = "http://localhost:8080"
  
  constructor(private http: HttpClient) { }
  
  findById(id: any): Observable<Acessorio> {
    return this.http.get<Acessorio>(`${this.API_URL}/acessorio/${id}`)
  }

  findAll(): Observable<Acessorio[]> {
    return this.http.get<Acessorio[]>(`${this.API_URL}/acessorio`)
  }

  create(acessorio: Acessorio): Observable<Acessorio> {
    return this.http.post<Acessorio>(`${this.API_URL}/acessorio`, acessorio)
  }
  
  update(acessorio: Acessorio): Observable<Acessorio> {
    return this.http.put < Acessorio >(`${this.API_URL}/acessorio/${acessorio.id}`, acessorio)
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/acessorio/${id}`, id)
  }
  
  removeAcessorio(veiculoId: Number, acessorioId: Number): Observable<Veiculo> {
    return this.http.delete<Veiculo>(`${this.API_URL}/veiculo/${veiculoId}/remove-acessorio/${acessorioId}`);
  }

  addAcessorio(veiculoId: Number, acessorio: Acessorio): Observable<Veiculo> {
    return this.http.post<Veiculo>(`${this.API_URL}/veiculo/${veiculoId}/add-acessorio`, acessorio);
  }
  
}
