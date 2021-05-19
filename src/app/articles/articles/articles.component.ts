import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Article from 'src/app/models/articles';
import { ApiService } from 'src/app/services/api.service';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements DoCheck {

  type:string;
  articles: Article[];
  canLikes: boolean[];
  likes: number;
  noArticles: string;


  constructor (public articleService: ArticleService, 
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private userService: UserService) { 
 
    this.activatedRoute.data.subscribe( data => {
      this.type = data.type;
    });

    if (this.type == 'fun') {
      this.noArticles = 'having fun';
    } else if(this.type == 'explore'){
      this.noArticles = 'exploring';
    }else if(this.type == 'meal'){
      this.noArticles = 'places to eat at';
    }else if(this.type == 'night'){
      this.noArticles = 'spending the night';
    }

  }

  get location(){
    return this.apiService.location;
  }

  get currUser() {
    return this.userService.currentUser;
  }

 
  ngDoCheck(): void {
 
    this.articles = this.articleService.getAllArticles(this.type, this.location); 

  }

  deleteHandler(articleId) {
    try{
      this.articleService.delete(articleId);
    } catch(e) {
      console.log(e);
    }
  
    } 

    likeHandler(articleId) {
      try{
        this.articleService.like(articleId, this.currUser.id);
      } catch(e) {
        console.log(e);
      }
   }

   unlikeHandler(articleId) {
    try{
      this.articleService.unlike(articleId, this.currUser.id);
    } catch(e) {
      console.log(e);
    }
   }

}
