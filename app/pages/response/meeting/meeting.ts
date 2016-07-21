import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';

@Component({
    templateUrl: 'build/pages/response/meeting/meeting.html'
})
export class Meeting{
    responseData = {};

    constructor(private navParams: NavParams,private nav: NavController, private confData: UserData){
      console.log('response from meeting ......');
        console.log(navParams.data);
        let messageDetail = navParams.data;
        this.confData.getResponseDetail(messageDetail.user_contact_id,messageDetail.type).then(res => {
            console.log('######---- response data ---- #######');
            console.log(res);
            let data = res;
            this.responseData = data;
        });
    }

    onSend(data){
        console.log("_-------------___");
        console.log(data);
    }
}
