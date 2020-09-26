import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private _route: Router) { }

  ngOnInit(): void {
  }

  district(){
    this._route.navigate(['/district']);
  }

  localBody(){
    this._route.navigate(['/localBody']);
  }

  ward(){
    this._route.navigate(['/ward']);
  }

  voter(){
    this._route.navigate(['/voter']);
  }

  pollingStation(){
    this._route.navigate(['/pollingStation']);
  }

  candidate(){
    this._route.navigate(['/candidate']);
  }

  religion(){
    this._route.navigate(['/religion']);
  }

  caste(){
    this._route.navigate(['/caste']);
  }

  user(){
    this._route.navigate(['/user']);
  }
  
}
