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

    showOption(contact_id){
        let alert = Alert.create();
        alert.setTitle('Select Response');

        alert.addInput({
            type: 'radio',
            label: 'Meeting',
            value: '1',
            checked: true
        });

        alert.addInput({
            type: 'radio',
            label: 'Cycle',
            value: '2'
        });

        alert.addInput({
            type: 'radio',
            label: 'Follow Up',
            value: '3'
        });

        alert.addInput({
            type: 'radio',
            label: 'Inactive',
            value: '4'
        });

        alert.addInput({
            type: 'radio',
            label: 'Remove',
            value: '5'
        });

        alert.addInput({
            type: 'radio',
            label: 'Conversation',
            value: '6'
        });

        alert.addInput({
            type: 'radio',
            label: 'Enter Activity',
            value: '7'
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                console.log(data);
                console.log(contact_id);
            }
        });

        this.nav.present(alert);

    }
}