import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

@Component({
    templateUrl: 'build/pages/meetingDetail/meetingDetail.html'
})

export class MeetingDetail{
    loading;
    meetingDetail = [];
    constructor(private nav: NavController,private navParams: NavParams , private confData: UserData){
        let meeting_id = this.navParams.data.messageId;
        //this.showLoader();
        console.log("data of meeting:::: ",meeting_id);
        if(meeting_id){
            this.confData.getMeetingDetail(meeting_id).then(res => {
                let resultData;
                resultData = res;
                this.meetingDetail = resultData;
                console.log(resultData);
                //this.hideLoader();
            });
        }

    }
}