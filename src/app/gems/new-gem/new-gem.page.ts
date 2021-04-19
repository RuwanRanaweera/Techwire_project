import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { GemsService } from '../../gems/gems.service';
import { FirebaseService } from '../firebase.service';
import { HttpClient } from '@angular/common/http'; 
import { collectExternalReferences } from '@angular/compiler';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-gem',
  templateUrl: './new-gem.page.html',
  styleUrls: ['./new-gem.page.scss'],
})
export class NewGemPage implements OnInit {
  form: FormGroup;

  constructor( 
    private gemsService: GemsService, 
    private router: Router, 
    private firebaseService: FirebaseService , 
    private http:HttpClient,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {

    this.form = new FormGroup(
      {
        title: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(180)]
        }),
        price: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(1)]
        },
        ),
        type: new FormControl('biff', {
          validators: [Validators.required]
        },
        )
      });
  }




  onCancle() {
    this.form.reset();
  }

  //file upload

  files : File[]=[];
  urls: string[];
  eve: EventTarget
  selectedFileType: String;
 async onSelectFile(event) {

    if( event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/x-png"){
      this.selectedFileType = event.target.files[0].type;
      console.log("event :--- ", event.target.files[0].type)
      // image/x-png , image/jpeg
      this.files = [];
      this.urls = [];
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        this.eve = event.target.files;
        console.log("event : " + JSON.stringify(event.target.files[0]))
        for (let i = 0; i < filesAmount; i++) {
          var reader: any,
            target: EventTarget;
          reader = new FileReader();
          this.files.push(event.target.files.item(i));
          console.log("event : " + JSON.stringify(event.target.files[0]))
          reader.onload = (event) => {
            this.urls.push(event.target.result);
          }
          reader.readAsDataURL(event.target.files[i]);
        }
      }

    }
    else{
      const toast = await this.toastCtrl.create({
        message: 'This file type cannot be accepte',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    }
    

   
  }
  uploadToFIrebase(){
    console.log(this.selectedFileType)
    if( this.selectedFileType == "image/jpeg" || this.selectedFileType == "image/x-png") {
      this.firebaseService.uploadAnyImageToFirebase(this.files,"firebaseSampleTest").then(
        (res: string[])=>{
          console.log(res[0])
          
          let id = +localStorage.getItem('userID');

          let data = {
            gemName:this.form.controls.title.value,
            gemDescription:this.form.controls.description.value,
            price:this.form.controls.price.value,
            gemBid:this.form.controls.type.value,
            userId:id,
            gemImage:res[0]
          }

         this.http.post('http://localhost:49789/api/Gem/insert',data).subscribe(
           res=>{
            console.log(res , 'Successfullly Saved ....!');
            if(data.gemBid) {
              this.router.navigateByUrl('/gems/fixed-gems-list');
            } else {
              this.router.navigateByUrl('/gems/bid-gems-list');
            }
         
           },
           err=>{
              console.log(err)
           }
         )  


        },err=>{
          console.log("error in uploading to the firebase")
        }
      )
    }
     
  }


}
