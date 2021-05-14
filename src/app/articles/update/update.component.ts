import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Article from 'src/app/models/articles';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css', '../create/create.component.css', '../../user/register/register/register.component.css']
})
export class UpdateComponent implements OnInit {

  updateForm: FormGroup;
  articleId: string;
  currArticle: Article

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
    this.articleId = params.id;   


    this.currArticle = this.articleService.getArticle(this.articleId);
    console.log(this.currArticle);

    this.updateForm = this.formBuilder.group({
      title: [`${this.currArticle.title}`],
      description: [`${this.currArticle.description}`],
      imageUrl: [`${this.currArticle.imageUrl}`]
    });

  })


  }

  updateHandler(data) {  
  this.articleService.update(data, this.articleId, this.currArticle);
  this.router.navigate([`/articles/${this.articleService.type}`]);
 
 }
}
