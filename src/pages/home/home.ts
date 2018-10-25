import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomeService } from '../../services/home-service';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {

  data:any = {};
  eventos: any;
  items:any;

  constructor(public navCtrl: NavController, public service:HomeService,  public http: Http) {
    service.load().subscribe(snapshot => {
      this.data = snapshot;
    });
    this.http.get('assets/datos/category.json').map(res => res.json()).subscribe(eventos => {
    this.eventos = eventos.categorys;
    for(let evento of eventos){
      let items = evento;
      console.log(items);
    }
    }, erro => console.log(erro));


  }

}
