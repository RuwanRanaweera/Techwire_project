import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { GemsService } from '../gems/gems.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage implements OnInit {
  forms: FormGroup;
  meetlist;
  constructor( private http:HttpClient,private gemsService: GemsService) { }

  ngOnInit() {
    this.forms = new FormGroup(
      {
        timer: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        linkmeet: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        })
    
    
      
      });
  }

  ionViewWillEnter() {
    this.meetList();
  }
async  onRequest() {
  let id = +localStorage.getItem('userID');

  let data = {
    time:this.forms.controls.timer.value,
    link:this.forms.controls.linkmeet.value,
    userId:id,
    approve:0
  
  }
  this.http.post('http://localhost:49789/api/Meet/insert',data).subscribe(
    res=>{
     console.log(res , 'Successfullly Saved ....!');
    },
    err=>{
       console.log(err)
    }
  )
}
meetApp=[];
meetList() {
  let id = +localStorage.getItem('userID')
  this.gemsService.getmeetList(id).subscribe((res:any) => {
    //console.log(res.data);
    this.meetlist=res.data;

    
    let indx=0;
    this.meetlist.forEach((met)=>{
      if(met.approve){
        this.meetApp[indx]= met;
        indx++;
      }
    });
  
  });
}



}
