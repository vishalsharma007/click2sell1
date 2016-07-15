import { Component } from '@angular/core';

import { ActionSheet, NavController,Loading, Page } from 'ionic-angular';

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
  loading;

  constructor(private nav: NavController, confData: ConferenceData,userData: UserData) {
    this.showLoader();
    confData.getSpeakers().then(contacts => {
      this.contacts = contacts;
      console.log(contacts)
    });
    userData.getGroups().then(groups=>{
    	let resultData;
        resultData = groups;
    	this.groups = resultData.user_groups;
    	userData.getCampaigns().then(campaigns=>{
	    	let resultData;
	        resultData = campaigns;
	    	this.campaigns = resultData.campaigns;
	    	this.hideLoader();
    	});
    });
  }
	showLoader(){
	    this.loading = Loading.create({
	      content: 'Please wait...',
	    });
	    this.nav.present(this.loading);
	}

	hideLoader(){
		this.loading.dismiss();
		this.loading.dismiss();
	}
}