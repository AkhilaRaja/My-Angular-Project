import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  technologyItems=['Java', 'JS'];
  frameworkItems = ['Spring', 'SpringBoot', 'Angular'];
  designItems = ['HTML5', 'CSS']

  constructor(private _route: Router) { }

  ngOnInit(): void {
  }

}
