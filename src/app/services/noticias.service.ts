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

  headlinesPages = 0;
  
  // Infinit scroll
  currentCategory = '';
  categoryPage = 0;

  constructor( private http: HttpClient) { }

  // Execute query called from GETTERS
  private executeQuery<T>( query: string ) {
    query = apiUrl + query;
    return this.http.get<T>( query, { headers } );
  }

  getTopHeadLines() {
    this.headlinesPages++;
    return this.executeQuery<TopHeadLinesResponse>(`/top-headlines?country=us&page=${ this.headlinesPages }`);
  }

  getTopHeadLinesCategory( category: string ) {
    if (this.currentCategory === category) {
      this.categoryPage++;
    } else {
      this.categoryPage = 1;
      this.currentCategory = category;
    }

    return this.executeQuery<TopHeadLinesResponse>(`/top-headlines?country=us&category=${ category }&page=${ this.categoryPage }`);
  }
}
