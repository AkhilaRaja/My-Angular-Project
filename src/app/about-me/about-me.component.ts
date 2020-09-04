import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  technologyItems=['Java', 'JS'];
  frameworkItems = ['Spring', 'SpringBoot', 'Angular'];
  designItems = ['HTML5', 'CSS']

  constructor(private titleService:Title) {
    this.titleService.setTitle("My Profile");
  }

  ngOnInit(): void {
  }

}
