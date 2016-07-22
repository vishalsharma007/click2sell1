import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Meeting } from '../response/meeting/meeting';
import { cycle } from '../response/Cycle/cycle';
import { noAction } from '../response/noAction/noAction';
import { follow } from '../response/follow/follow';
import { remove } from '../response/remove/remove';
import { inActive } from '../response/inActive/inActive';
import { conversation } from '../response/conversation/conversation';

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
            label: 'Ok, I got it',
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
                    this.nav.push(cycle , {user_contact_id: meetingDetail.user_contact_id,type: data});
                }else if(data == 'no_action'){
                    this.nav.push(noAction , {user_contact_id: meetingDetail.user_contact_id,type: data});
                }else if(data == 'inactive'){
                    this.nav.push(inActive , {user_contact_id: meetingDetail.user_contact_id,type: data});
                }else if(data == 'remove'){
                    this.nav.push(remove , {user_contact_id: meetingDetail.user_contact_id,type: data});
                }else if(data == 'conversation'){
                    this.nav.push(conversation , {user_contact_id: meetingDetail.user_contact_id,type: data});

                }else if(data == 'follow_up'){
                    this.nav.push(follow , {user_contact_id: meetingDetail.user_contact_id,type: data});
                }
            }
        });

        this.nav.present(alert);

    }
}