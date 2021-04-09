import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { GemsService } from '../gems.service';

import { FirebaseService } from '../firebase.service';   

@Component({
  selector: 'app-fixed-gems-list',
  templateUrl: './fixed-gems-list.page.html',
  styleUrls: ['./fixed-gems-list.page.scss'],
})
export class FixedGemsListPage implements OnInit {

  gemlist;
 
  constructor(
    private gemsService: GemsService,
    private router: Router ,

    private firebaseService: FirebaseService
    
    ) { }
 
// const wee = gemlist.filter(function(element){
//   return element.type ===false;
// });


  ngOnInit() {
   this.gemList();
  }
  gemlistFix=[];
  
  gemList() {
    this.gemsService. getgemDetailsFullList().subscribe((res:any) => {
      console.log(res.data);
      this.gemlist=res.data;

      let indx=0;
      this.gemlist.forEach((gem)=>{
        if(!gem.gemBid){
          this.gemlistFix[indx] = gem;
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
