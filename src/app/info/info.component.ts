import { Component, Input, InputDecorator, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ArticleService } from '../services/article.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

 @Input() location: string;
//  nightArticles: any[] = this.articleService.getAllArticles('night',this.apiService.location);
//  mealArticles: any[] = this.articleService.getAllArticles('meal',this.apiService.location);
//  exploreArticles: any[] = this.articleService.getAllArticles('explore',this.apiService.location);
//  funArticles: any[] = this.articleService.getAllArticles('fun',this.apiService.location);

nightArticles: any[];
mealArticles: any[];
exploreArticles: any[];
funArticles: any[];


  constructor(public articleService: ArticleService, private apiService: ApiService) {}

  // get location(){
  //   return this.apiService.location;
  // }

  ngOnInit(): void {
    // this.nightArticles = this.articleService.getAllArticles('night',this.location);
    // this.mealArticles = this.articleService.getAllArticles('meal',this.location);
    // this.exploreArticles = this.articleService.getAllArticles('explore',this.location);
    // this.funArticles = this.articleService.getAllArticles('fun',this.location);

    this.nightArticles = this.articleService.nightArticles;
    this.mealArticles = this.articleService.mealArticles;
    this.exploreArticles = this.articleService.exploreArticles;
    this.funArticles = this.articleService.funArticles;
  }

}
