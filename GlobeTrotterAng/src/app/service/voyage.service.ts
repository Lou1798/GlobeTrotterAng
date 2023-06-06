import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {

  baseUrl = 'http://localhost:8000/api/';

  constructor( private http: HttpClient ) {}

  getVoyages(): Observable<any> {
    return this.http.get(this.baseUrl + 'voyages');
  }

  getUserVoyages(user_id: number): Observable<any> {
    const url = `${this.baseUrl + 'voyages?user_id=' + user_id}`;	
    return this.http.get(url);
  }

  addVoyage(voyage: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'voyage', voyage);
  }

  getVoyage(voyage_id: number): Observable<any> {
    const url = `${this.baseUrl + 'voyage'}/${voyage_id}`;
    return this.http.get<any>(url);
  }

  updateVoyage(vehicle_id: number, vehicle: any): Observable<any> {
    const url = `${this.baseUrl + 'vehicle'}/${vehicle_id}`;
    return this.http.put<any>(url, vehicle);
  }

  deleteVoyage(vehicle_id: number): Observable<any> {
    const url = `${this.baseUrl + 'vehicle' }/${vehicle_id}`;
    return this.http.delete<any>(url);
  }

  searchVoyages(search: string): Observable<any> {
    const url = `${this.baseUrl + 'search/voyages?name=' + search}`;
    // console.log('URL: ', url)
    return this.http.get<any>(url);
  }
}
