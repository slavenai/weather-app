import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Article from '../models/articles';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private dbPath = '/articles';

  articlesRef: AngularFireList<Article> = null;

  constructor(private db: AngularFireDatabase) {
    this.articlesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Article> {
    return this.articlesRef;
  }

  create(article: Article): any {
    return this.articlesRef.push(article);
  }

  update(id: string, value: any): Promise<void> {
    return this.articlesRef.update(id, value);
  }

  delete(id: string): Promise<void> {
    return this.articlesRef.remove(id);
  }

  deleteAll(): Promise<void> {
    return this.articlesRef.remove();
  }
}