import { Component, OnInit } from '@angular/core';
import { GemsService } from '../gems/gems.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit  {

  gemlist;
  
  gemlistFix=[];
  gemlistBid=[];

  constructor( private gemsService: GemsService) { }

  ngOnInit() {
 
  }
  
  ionViewWillEnter() {
    this.gemList() 
  }
  
  gemList() {
    let id = +localStorage.getItem('userID')
    this.gemsService.getgemDetailsFullList(id).subscribe((res:any) => {
      console.log(res.data);
      this.gemlist=res.data;
      console.log(this.gemlist.length);
 
         
      let indx=0;
      this.gemlist.forEach((gem)=>{
        if(gem.gemBid){
          this.gemlistBid[indx] = gem;
          indx++;
        }
      });

      let indxx=0;
      this.gemlist.forEach((gem)=>{
        if(!gem.gemBid){
          this.gemlistFix[indxx] = gem;
          indxx++;
        }
      });


    });
  }

  option = {
    slidesPerView:1,
    centeredSlides: true,
    loop: true,
    spaceBetween:10,
    autoplay: true
  }


}
