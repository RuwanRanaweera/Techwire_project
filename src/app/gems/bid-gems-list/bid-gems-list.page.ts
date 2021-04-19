import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

import { GemsService } from '../gems.service';

@Component({
  selector: 'app-bid-gems-list',
  templateUrl: './bid-gems-list.page.html',
  styleUrls: ['./bid-gems-list.page.scss'],
})
export class BidGemsListPage implements OnInit {

   gemlist;
  constructor(
    private gemsService: GemsService,
    private router: Router) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.gemList();
  }

  gemlistBid=[];

  gemList() {
    let id = +localStorage.getItem('userID')
    this.gemsService. getgemDetailsFullList(id).subscribe((res:any) => {
      console.log(res.data);
      this.gemlist=res.data;

      
      let indx=0;
      this.gemlist.forEach((gem)=>{
        if(gem.gemBid){
          this.gemlistBid[indx] = gem;
          indx++;
        }
      });
    
    });
  }

  onEdit(gemsId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.router.navigate(['/', 'gems', 'tabs', 'gem-list', 'edit-gem', gemsId]);
    console.log('Editing item', gemsId);
  }
}
