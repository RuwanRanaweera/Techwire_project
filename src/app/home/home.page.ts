import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor( public authService: AuthService) { }

  ngOnInit() {
    
    
  }

  ionViewWillEnter() {
    this.refreshsellerList();
  }


  userDetails;

refreshsellerList() {
  
  let id = +localStorage.getItem('userID')

  this.authService.getAllsellerList(id).subscribe((res:any) => {
    console.log(res.data);
    this.userDetails=res.data;
  
  });
}
}


  


