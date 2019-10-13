import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonSegmentButton } from '@ionic/angular';
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
  // ViewChild para recuperar la category del segmento
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  constructor( private noticasService: NoticiasService ) {
  }

  ngOnInit() {
    this.loadNews( this.categories[0] );
  }

  changeCategory( event ) {
    this.news = [];
    console.log("Hola");
    this.loadNews( event.detail.value );
  }

  loadData( event ) {
    this.loadNews( this.segment.value , event );
  }


  loadNews( category: string, event? ) {
    this.noticasService.getTopHeadLinesCategory( category )
      .subscribe( resp => {
        console.log(resp);
        this.news.push( ...resp.articles );

        if ( event ) {
          event.target.complete();
        }
      });
  }

}
