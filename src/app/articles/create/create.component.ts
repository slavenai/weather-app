import { Component, OnInit } from '@angular/core';
import Article from 'src/app/models/articles';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  article: Article

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }


  createArticle(): void {
    this.article = new Article();
    this.articleService.create(this.article).then(() => {
      console.log("Article created!");
    })
  }
}
