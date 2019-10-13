import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { TopHeadLinesResponse, Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  news: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit() {
    this.noticiasService.getTopHeadLines()
      .subscribe( resp => {
        console.log('noticias', resp);
        // push para insertar solo nuevas noticias y (...) para tratar los articulos por separado
        this.news.push (...resp.articles);
      });
  }

}
