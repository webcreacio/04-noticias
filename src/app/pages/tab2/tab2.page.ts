import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonSegmentButton, IonContent } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  news: Article[] = [];
  // ViewChild para recuperar la category del segmento
  @ViewChild(IonSegment, { static: false }) segment: IonSegment;
  // Scroll to Top
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor( private noticiasService: NoticiasService ) {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.loadNews( this.categories[0] );
  }

  changeCategory( event ) {
    this.news = [];
    this.content.scrollToTop();
    this.loadNews( event.detail.value );
  }

  loadData( event ) {
    this.loadNews( this.segment.value , event );
  }


  loadNews( category: string, event? ) {
    this.noticiasService.getTopHeadLinesCategory( category )
      .subscribe( resp => {
        this.news.push( ...resp.articles );

        if ( event ) {
          event.target.complete();
        }
      });
  }

}
