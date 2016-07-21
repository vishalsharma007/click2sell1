import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page } from 'ionic-angular';
import { MessageDetail } from '../messageDetail/messageDetail';
import { MeetingDetail } from '../meetingDetail/meetingDetail';
import { UserData } from '../../providers/user-data';

@Component({
  templateUrl: 'build/pages/messages/messages.html'
})
export class MessagesPage {
  // set the root pages for each tab
  hideElement;
  mySelectedIndex: number;
    messages = [];
    title = "Inbox";
    loading;

  constructor(private nav: NavController,private NavParams: NavParams,private confData: UserData) {
      let type;
      type = this.NavParams.data.type;  // find the selected tab title.

      // Below code for converting Message title based on selected tab.
      this.title = type == 'main-inbox' ? 'Inbox'
          : type == 'follow-up' ? 'Follow Up'
          : type == 'cycle' ? 'Cycle'
          : type == 'inactive' ? 'Inactive'
          : type == 'ok-message' ? 'Ok, I got it'
          : type == 'spam' ? 'Spam'
          : type == 'meetings' ? 'Meetings'
          : type == 'remove' ? 'Remove' : 'Inbox';
      this.showLoader();
     // calling backend api based on selected messages tab.
      if(type=='meetings'){
          this.confData.getMeetingData().then(res => {
              let resultData;
              resultData = res;
              this.messages = resultData.meeitngs;
              setTimeout(() => {
                  this.hideLoader();
              }, 1000);
          });

      }else{
          this.confData.getMessageData(type).then(res => {
              let resultData;
              resultData = res;
              this.messages = resultData.messages;
              this.hideElement = resultData.messages == 0 ? true : false;
              setTimeout(() => {
                  this.hideLoader();
              }, 1000);
          });
      }


  }
    itemSelected(message){
        let type = this.NavParams.data.type;
        console.log('on selected item ;;;:::: ');
        console.log(message);
        if(type=='meetings'){
            this.nav.push(MeetingDetail, {messageId: message.id});
        }else {
            this.nav.push(MessageDetail, {messageId: message.id});
        }
    }

    showLoader(){
        this.loading = Loading.create({
            content: 'Please wait...'
        });
        console.log("here in load");
        this.nav.present(this.loading);
    }

    hideLoader(){
        this.loading.dismiss();
        this.loading.dismiss();
    }
}