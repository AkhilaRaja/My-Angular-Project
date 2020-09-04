import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-rahul',
  templateUrl: './profile-rahul.component.html',
  styleUrls: ['./profile-rahul.component.css']
})
export class ProfileRahulComponent implements OnInit {

  constructor(private titleService:Title) { 
    this.titleService.setTitle("My Profile");
  }

  ngOnInit(): void {
  }

}
