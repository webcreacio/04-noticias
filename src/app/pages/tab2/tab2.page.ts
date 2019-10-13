import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  news: Article[] = [];

  constructor( private noticasService: NoticiasService ) {
  }

  ngOnInit() {
    this.loadNews( this.categories[0] );
  }

  changeCategory( event ) {
    this.news = [];
    this.loadNews( event.detail.value );
  }

  loadNews( category: string) {
    this.noticasService.getTopHeadLinesCategory( category )
      .subscribe( resp => {
        console.log(resp);
        this.news.push( ...resp.articles );
      });
  }

}
