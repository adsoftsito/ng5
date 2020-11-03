import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ResponseApi } from '../../models/responseapi';
import { GoalsApi } from './goalsApi';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private goals = new BehaviorSubject<any>(['La meta inicial', 'Otra meta :P']);
  goal=  this.goals.asObservable();

  constructor(private http: HttpClient) { }

  changeGoal(goal){
    this.goals.next(goal)
  }

  //apiURL = 'http://localhost:8080';
  apiURL = 'http://104.198.244.0:8192';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET' 
      })
  }  

  


  getGoals(): Observable<GoalsApi> {
    return this.http.get<GoalsApi>(this.apiURL + '/questions', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }   

  newGoal(payload): Observable<GoalsApi> {
    return this.http.post<GoalsApi>(this.apiURL + '/questions', JSON.stringify(payload), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

/*
  postParks(parksApi): Observable<ParksApi> {
    //console.log("print post: " + this.apiURL + '/parques', JSON.stringify(parksApi), this.httpOptions)
    return this.http.post<ParksApi>(this.apiURL + '/parques', JSON.stringify(parksApi), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }*/
  
  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
