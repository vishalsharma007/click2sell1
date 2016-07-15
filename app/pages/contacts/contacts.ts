import { Component } from '@angular/core';

import { ActionSheet, NavController, Page } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

import { UserData } from '../../providers/user-data';

@Component({
  templateUrl: 'build/pages/contacts/contacts.html'
})
export class ContactsPage {
  actionSheet: ActionSheet;
  contacts = [];
  campaigns;
  groups;

  constructor(private nav: NavController, confData: ConferenceData,userData: UserData) {
    confData.getSpeakers().then(contacts => {
      this.contacts = contacts;
      console.log(contacts)
    });
    userData.getGroups().then(groups=>{
    	let resultData;
        resultData = groups;
    	this.groups = resultData.user_groups;
    });

    userData.getCampaigns().then(campaigns=>{
    	let resultData;
        resultData = campaigns;
    	this.campaigns = resultData.campaigns;
    });
  }
}