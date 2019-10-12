import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient) { }

  getTopHeadLines() {
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=feeb7bc127ad41afa93b181a0919f381`);
  }

}
