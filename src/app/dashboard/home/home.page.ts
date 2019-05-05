import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';

  constructor() { }

  ngOnInit() {
  }

}
