import { Component } from '@angular/core';

import { ActionSheet, NavController, Page } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  templateUrl: 'build/pages/campaign/campaign.html'
})
export class CampaignPage {
  actionSheet: ActionSheet;
  contacts = [];

  constructor(private nav: NavController, confData: ConferenceData) {
    confData.getSpeakers().then(contacts => {
      this.contacts = contacts;
      console.log(contacts)
    });
  }
}