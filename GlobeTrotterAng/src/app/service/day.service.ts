import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DayService {

  //URL de base de l'api
  baseUrl = 'http://localhost:8000/api/';
  
  constructor( private http: HttpClient, 
    private router:Router, 
    private jwtHelper:JwtHelperService ) { }

  //Récupère tous les jours
  //Peut être utilisé si on met en place des notes non associé à des voyages?
  getDays(): Observable<any> {
    return this.http.get(this.baseUrl + 'days');
  }

  //Récupère les jours associé à un voyage spécifique
  getDayVoyages(voyage_id: string): Observable<any> {
    const url = `${this.baseUrl + 'days?voyage_id=' + voyage_id}`;
    console.log('URL: ', url)
    return this.http.get<any>(url);
  }

  //Récupère un jour spécifique
  getDay(day_id: string): Observable<any> {
    const url = `${this.baseUrl + 'day'}/${day_id}`;
    return this.http.get<any>(url);
  }

  //crée un nouveau jour
  createDay(day: any): Observable<any> {
    return this.http.post(this.baseUrl + 'day', day);
  }

  //modifie un jour spécifique
  updateDay(day_id: number, day: any): Observable<any> {
    const url = `${this.baseUrl + 'day'}/${day_id}`;
    return this.http.put<any>(url, day);
  }

  //supprime un jour spécifique
  deleteDay(vehicle_id: number): Observable<any> {
    const url = `${this.baseUrl + 'day' }/${vehicle_id}`;
    return this.http.delete<any>(url);
  }

  //recherche des jours en fonction du nom et d'un paramètre
  searchDays(search: string): Observable<any> {
    const url = `${this.baseUrl + 'days?name=' + search}`;
    // console.log('URL: ', url)
    return this.http.get<any>(url);
  }
}
