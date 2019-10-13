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
    this.loadNews();
  }

  loadData(event) {
    this.loadNews( event );
  }

  loadNews( event? ) {
    this.noticiasService.getTopHeadLines()
    .subscribe( resp => {
      console.log('noticias', resp);

      // comprobar que no hay más para cargar
      if (resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      // push para insertar solo nuevas noticias y (...) para tratar los articulos por separado
      this.news.push (...resp.articles);

      //Cancelar loading data... una vez cargados todos los articles devueltos
      if ( event ) {
        event.target.complete();
      }
    });
  }

}
