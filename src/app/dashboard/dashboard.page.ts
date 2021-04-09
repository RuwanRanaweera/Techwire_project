import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  option = {
    slidesPerView:1,
    centeredSlides: true,
    loop: true,
    spaceBetween:10,
    autoplay: true
  }


}
