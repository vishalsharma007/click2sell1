import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page } from 'ionic-angular';
//import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

@Component({
  templateUrl: 'build/pages/messages/messages.html'
})
export class MessagesPage {
  // set the root pages for each tab

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
          : type == 'remove' ? 'Remove' : 'Inbox';
      this.showLoader();
     // calling backend api based on selected messages tab.
    this.confData.getMessageData(type).then(res => {
        let resultData;
        resultData = res;
        this.messages = resultData.messages;
        setTimeout(() => {
            this.hideLoader();
        }, 1000);
    });

  }
    itemSelected(message){
        console.log(message);
        this.confData.getMessageDetail(message.id).then(res => {
            let resultData;
            resultData = res;
           console.log(resultData);
        });
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