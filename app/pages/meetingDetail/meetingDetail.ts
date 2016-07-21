import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Meeting } from '../response/meeting/meeting';

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

    showOption(meetingDetail){
        console.log("on click show option for response:::0");
        console.log(meetingDetail);
        let alert = Alert.create();
        alert.setTitle('Select Response');

        alert.addInput({
            type: 'radio',
            label: 'Meeting',
            value: 'meeting',
            checked: true
        });

        alert.addInput({
            type: 'radio',
            label: 'Cycle',
            value: 'cycle'
        });

        alert.addInput({
            type: 'radio',
            label: 'No Action',
            value: 'no_action'
        });

        alert.addInput({
            type: 'radio',
            label: 'Inactive',
            value: 'inactive'
        });

        alert.addInput({
            type: 'radio',
            label: 'Remove',
            value: 'remove'
        });

        alert.addInput({
            type: 'radio',
            label: 'Conversation',
            value: 'conversation'
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                console.log(data);
                console.log(meetingDetail);
                if(data == 'meeting'){
                    this.nav.push(Meeting , {user_contact_id: meetingDetail.user_contact_id,type: data});
                }else if(data == 'cycle'){

                }else if(data == 'no_action'){

                }else if(data == 'inactive'){

                }else if(data == 'remove'){

                }else if(data == 'conversation'){

                }
            }
        });

        this.nav.present(alert);

    }
}