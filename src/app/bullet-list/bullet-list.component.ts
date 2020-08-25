import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bullet-list',
  templateUrl: './bullet-list.component.html',
  styleUrls: ['./bullet-list.component.css']
})
export class BulletListComponent implements OnInit {

  @Input() items: string[];
  @Input() color = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
