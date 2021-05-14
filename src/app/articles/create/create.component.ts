import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Article from 'src/app/models/articles';
import { ApiService } from 'src/app/services/api.service';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../../user/register/register/register.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  type: string;
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  )
   {
    this.activatedRoute.data.subscribe( data => {
      this.type = data.type;
    });
  }
  
  
  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
    

  }

  get location() {
    return this.apiService.location;
  }

  get userId() {
    return this.userService.currentUser.id;
  }

  get userName() {
    return this.userService.currentUser.username;
  }

  createHandler(data) {
      try{
        this.articleService.create(data, this.type, this.location, this.userId, this.userName);
      } catch(e){
        console.log(e);
      }
       
      this.router.navigate([`/articles/${this.type}`]);
  }
}
