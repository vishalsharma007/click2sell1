import { Component } from '@angular/core';
import { NavParams,ActionSheet, NavController, Page } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  templateUrl: 'build/pages/messages/messages.html'
})
export class MessagesPage {
  // set the root pages for each tab

  mySelectedIndex: number;
  contacts = [];
  constructor(private nav: NavController, confData: ConferenceData) {
    confData.getSpeakers().then(contacts => {
      this.contacts = contacts;
      console.log(contacts)
    });
  }
}