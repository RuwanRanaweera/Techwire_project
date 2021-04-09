import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GemsService {
  readonly baseURL = 'http://localhost:49789/api/Gem/Select';

  constructor( private http: HttpClient) { }



  getgemDetailsFullList() {
    return this.http.get(this.baseURL); 
    }


}

