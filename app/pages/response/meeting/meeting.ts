import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';

@Component({
    templateUrl: 'build/pages/response/meeting/meeting.html'
})
export class Meeting{
    constructor(private navParams: NavParams,private nav: NavController){
      console.log('response from meeting ......');
    }
}