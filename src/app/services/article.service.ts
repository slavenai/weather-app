import { Injectable, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from  "@angular/fire/auth";
import Article from '../models/articles';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import User from '../models/user';

@Injectable()

export class ArticleService {


  article: Article  
  articlesRef;
  likesRef;
  type: string
  articles;
  currUser: User;

  constructor(private db: AngularFireDatabase, private userService: UserService, private apiService: ApiService) {
    this.articlesRef = this.db.database.ref('articles');
    this.likesRef = this.db.database.ref('likes');
    this.currUser = this.userService.currentUser;
  }

  get nightArticles(){
    return this.getAllArticles('night', this.apiService.location);
  }

  get mealArticles(){
    return this.getAllArticles('meal', this.apiService.location);
  }

  get funArticles(){
    return this.getAllArticles('fun', this.apiService.location);
  }

  get exploreArticles(){
    return this.getAllArticles('explore', this.apiService.location);
  }


  create(article: Article, type, location, uid, username): any { 
      let newArticleRef = this.articlesRef.push();

      let currArticle;
      let newDate = new Date().toString();
      let dateArr = newDate.split(" ")
      let timeArr = dateArr[4].split(":") 
      let time = `${timeArr[0]}:${timeArr[1]}`;
      let date = `${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`;  

      newArticleRef.set({
      title: article.title,
      location: location,
      category: type,
      description: article.description,
      imageUrl: article.imageUrl,
      creatorId: uid,
      creatorName: username,
      likes: 0,
      date: `${date}, ${time}`,
      id: newArticleRef.key
    });

    newArticleRef.on('value', function(snapshot) {
      currArticle = snapshot.val();      
    })

    this.article = currArticle;
    this.article.id = newArticleRef.key;

    console.log(this.article);
    return this.article;
  }

  getAllArticles(type, location){
    this.type = type;
    let articlesArr = [];
   
    try{
      this.articlesRef.on('value', function(snapshot) {
     
        Object.entries(snapshot.val()).forEach((arr) => {
          articlesArr.push(arr[1]);
        })
      })
      
      articlesArr = articlesArr.filter(obj => obj.location == location);
      articlesArr = articlesArr.filter(obj => obj.category == type);
  
      this.articles = articlesArr;
      return this.articles;
    }catch(e) {
      console.log(e);
    }
      
   

  }

  getArticle(id): Article {
    let currArticle;
    let articles = this.getAllArticles(this.type, this.apiService.location)

    // this.articles = this.getAllArticles(this.type, this.apiService.location)

    // this.articles.forEach(a => {
    //   if(a.id == id) {
    //     currArticle = a;
    //   }    
    // });
    articles.forEach(a => {
      if(a.id == id) {
        currArticle = a;
      }    
    });
    console.log(currArticle);
    return currArticle;
  }

  update(data, articleId, currArticle) {
    let { title, description, imageUrl } = data;

    this.articlesRef.child(articleId).set({
      title: title,
      description: description,
      imageUrl: imageUrl,
      category: currArticle.category,
      creatorId: currArticle.creatorId,
      creatorName: currArticle.creatorName,
      date: currArticle.date,
      likes: currArticle.likes,
      id: currArticle.id,
      location: currArticle.location
    })  
  }

  delete(articleId) {
    let likeIdArr = [];
    this.articlesRef.child(articleId).remove();
    
    this.db.database.ref('likes').on('value', function (snapshot) {      
     
      Object.entries(snapshot.val()).forEach((arr) => {  
        //@ts-ignore
          if (arr[1].articleId = articleId) {
            likeIdArr.push(arr[0]);
          }
      })       
    })

    likeIdArr.forEach((id) => {
      this.db.database.ref('likes/' + id).remove();
    })


  }

  canLike(articleId, userId) {

    let likesArr = [];
    let canLike = true;
    
    this.db.database.ref('likes').on('value', function (snapshot) {
      
      if (snapshot.exists()) {
        Object.entries(snapshot.val()).forEach((arr) => {  
          likesArr.push(arr[1]);          
         })       
       }            
      })

       for (let i = 0; i < likesArr.length; i++ ) {
        if (likesArr[i].articleId == articleId && likesArr[i].userId == userId) {
          canLike = false;
          break;
        }
      }

      return canLike;
      }

  like(articleId, userId): boolean {
    let likesArr = [];
    let canLike = this.canLike(articleId, userId);
    let currArticle = this.getArticle(articleId);


      this.db.database.ref('likes').on('value', function (snapshot) {
      
          if (snapshot.exists()) {
            Object.entries(snapshot.val()).forEach((arr) => {  
              likesArr.push(arr[1]);          
             })       
           }            
          })

           for (let i = 0; i < likesArr.length; i++ ) {
            if (likesArr[i].articleId == articleId && likesArr[i].userId == userId) {
              canLike = false;
              break;
            }
          }

          if ( canLike != false ) {
        
            this.db.database.ref('articles/' + articleId).update({     
                  likes: Number(currArticle.likes) + 1         
                })  
          
                let newLikesRef = this.likesRef.push();
                          newLikesRef.set({
                            articleId: articleId,
                            userId: userId
                          });

                          canLike = true;
                          console.log('liked');
          }               
          return canLike;         
  
    }
    unlike(articleId, userId) {
  
      let currArticle = this.getArticle(articleId);
      let likeId = '';

      this.db.database.ref('likes').on('value', function (snapshot) {
      
     
          Object.entries(snapshot.val()).forEach((arr) => {  
            //@ts-ignore
              if (arr[1].articleId = articleId && arr[1].userId == userId) {
                likeId = arr[0];
                return;
              }
          })       
        console.log(snapshot.val());    
        })

      this.db.database.ref('likes/' + likeId).remove();
    
      this.db.database.ref('articles/' + articleId).update({     
        likes: Number(currArticle.likes) - 1         
      })
    }
}


