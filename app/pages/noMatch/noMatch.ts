import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';


@Component({
    templateUrl: 'build/pages/noMatch/noMatch.html'
})

export class noMatch{
    constructor(private navParams: NavParams,private nav: NavController){
        console.log('response from No Match ......');
    }
}