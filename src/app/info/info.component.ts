import { Component, Input, InputDecorator, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

 @Input() location: string;

  constructor() {}

  ngOnInit(): void {}

}
