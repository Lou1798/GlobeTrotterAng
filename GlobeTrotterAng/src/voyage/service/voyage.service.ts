import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {

  //URL de base de l'api
  baseUrl = 'http://localhost:8000/api/';

  constructor( private http: HttpClient ) {}

  //Récupère tous les voyages
  //Pas utilisé
  getVoyages(): Observable<any> {
    return this.http.get(this.baseUrl + 'voyages');
  }

  //Récupère les voyages d'un utilisateur spécifique
  getUserVoyages(user_id: string): Observable<any> {
    const url = `${this.baseUrl + 'voyages?user_id=' + user_id}`;
    // console.log('URL: ', url)
    return this.http.get<any>(url);
  }

  //Ajoute un nouveau voyage
  addVoyage(voyage: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'voyage', voyage);
  }

  //Récupère les détails d'un voyage en fonvtion d'un id
  getVoyage(voyage_id: string): Observable<any> {
    const url = `${this.baseUrl + 'voyage'}/${voyage_id}`;
    return this.http.get<any>(url);
  }

  //Met à jour un voyage en fonction d'un id
  updateVoyage(voyage_id: number, vehicle: any): Observable<any> {
    const url = `${this.baseUrl + 'voyage'}/${voyage_id}`;
    return this.http.put<any>(url, vehicle);
  }

//Recherche des voyages en fonction du nom 
  searchNameVoyages(search: string): Observable<any> {
    const url = `${this.baseUrl + 'voyage?name=' + search}`;
    // console.log('URL: ', url)
    return this.http.get<any>(url);
  }
}
