import { Injectable, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from  "@angular/fire/auth";
import Article from '../models/articles';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()

export class ArticleService {


  article: Article  
  articlesRef;


  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.articlesRef = this.db.database.ref('articles');
  }


  create(article: Article, type, location, uid): any { 
      let newArticleRef = this.articlesRef.push();
      let currArticle;

      newArticleRef.set({
      title: article.title,
      location: location,
      category: type,
      description: article.description,
      imageUrl: article.imageUrl,
      creatorId: uid,
      likes: []
    });

    newArticleRef.on('value', function(snapshot) {
      currArticle = snapshot.val();      
    })

    this.article = currArticle;
    this.article.id = newArticleRef.key;

    return this.article;
  }
}