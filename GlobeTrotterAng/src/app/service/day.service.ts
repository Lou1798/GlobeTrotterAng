import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


export class Day {
  'title': string;
  'content': string;
  'specifiedDate': Date;
  'specifiedLocation': string;
  'voyage_id': string;
} 


@Injectable({
  providedIn: 'root'
})
export class DayService {

  baseUrl = 'http://localhost:8000/api/';
  
  constructor( private http: HttpClient, private router:Router, private jwtHelper:JwtHelperService ) { }

  getDays(): Observable<any> {
    return this.http.get(this.baseUrl + 'days');
  }

  getDayVoyages(voyage_id: string): Observable<any> {
    const url = `${this.baseUrl + 'days?voyage_id=' + voyage_id}`;
    console.log('URL: ', url)
    return this.http.get<any>(url);
  }

  getDay(day_id: string): Observable<any> {
    const url = `${this.baseUrl + 'day'}/${day_id}`;
    return this.http.get<any>(url);
  }

  createDay(day: any): Observable<any> {
    return this.http.post(this.baseUrl + 'day', day);
  }

  updateDay(day_id: number, day: any): Observable<any> {
    const url = `${this.baseUrl + 'day'}/${day_id}`;
    return this.http.put<any>(url, day);
  }

  deleteDay(vehicle_id: number): Observable<any> {
    const url = `${this.baseUrl + 'day' }/${vehicle_id}`;
    return this.http.delete<any>(url);
  }

  searchDays(search: string): Observable<any> {
    const url = `${this.baseUrl + 'days?name=' + search}`;
    // console.log('URL: ', url)
    return this.http.get<any>(url);
  }
}
