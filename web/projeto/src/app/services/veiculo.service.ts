import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/veiculo';

@Injectable({
  providedIn: 'root'
})

export class VeiculoService {
    
  private API_URL = "http://localhost:8080"
  
  constructor(private http: HttpClient) { }
  
  findById(id: any): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.API_URL}/veiculo/${id}`)
  }

  findAll(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.API_URL}/veiculo`)
  }

  create(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(`${this.API_URL}/veiculo`, veiculo)
  }
  
  update(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put < Veiculo >(`${this.API_URL}/veiculo/${veiculo.id}`, veiculo)
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/veiculo/${id}`, id)
  }
  
}
