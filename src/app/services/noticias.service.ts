import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TopHeadLinesResponse } from '../interfaces/interfaces';

const apiKey = environment.apikey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private executeQuery<T>( query: string ) {
    query = apiUrl + query;
    return this.http.get<T>( query, { headers } );
  }

  constructor( private http: HttpClient) { }

  getTopHeadLines() {
    return this.executeQuery<TopHeadLinesResponse>(`/top-headlines?country=us`);
  }

  getTopHeadLinesCategory( category: string ) {
    return this.executeQuery<TopHeadLinesResponse>(`/top-headlines?country=us&category=${ category }`);
  }
}
