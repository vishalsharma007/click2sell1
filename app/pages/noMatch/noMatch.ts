import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';
import { UserData } from '../../providers/user-data';


@Component({
    templateUrl: 'build/pages/noMatch/noMatch.html'
})

export class noMatch{
    constructor(private navParams: NavParams,private nav: NavController,private confData: UserData){
        console.log('response from No Match ......');
        let messageDetail = navParams.data;
        this.confData.getResponseDetail(messageDetail.user_contact_id,messageDetail.type).then(res => {
            console.log('######---- response data from No Match ---- #######');
            console.log(res);
            let data = res;
//            this.responseData = data;
//            this.hideLoader();
        });
    }
}