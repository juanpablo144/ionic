import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {
eventos: any;
    constructor(public af: AngularFireDatabase, public http: Http,) {
      this.http.get('assets/categorys.json').map(res => res.json()).subscribe(eventos => {
      this.eventos = eventos;
      return eventos;
      });
    }

    // HOME PAGE INFO
    getData = () => {
        return {
            "toolbarTitle": "Ionic3 UI Theme - Green Light",
            "title": "SAVE HOURS",
            "subtitle": "OF DEVELOPING",
            "subtitle2": "and make apps fast as light!",
            "link":"http://csform.com/documentation-for-ionic-3-ui-template-app-green-light/",
            "description": "For better understanding how our template works please read documentation.",
            "background": "assets/images/background/23.jpg"
        };
    };

    load(): Observable<any> {
        if (AppSettings.IS_FIREBASE_ENABLED) {
            return new Observable(observer => {
                this.af
                    .object('home')
                    .valueChanges()
                    .subscribe(snapshot => {
                        observer.next(snapshot);
                        observer.complete();
                    }, err => {
                        observer.error([]);
                        observer.complete();
                    });
            });
        } else {
            return new Observable(observer => {
                observer.next(this.getData());
                observer.complete();
            });
        }
    }
}
