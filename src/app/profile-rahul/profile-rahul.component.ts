import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-rahul',
  templateUrl: './profile-rahul.component.html',
  styleUrls: ['./profile-rahul.component.css']
})
export class ProfileRahulComponent implements OnInit {

  technologyItems=['Java', 'JS'];
  frameworkItems = ['Spring', 'SpringBoot', 'Angular'];
  designItems = ['HTML5', 'CSS']

  constructor() { }

  ngOnInit(): void {
  }

}
