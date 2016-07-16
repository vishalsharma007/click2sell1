import { Component } from '@angular/core';

import { ActionSheet, NavController,Loading, Page,Alert } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

import { UserData } from '../../providers/user-data';

import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/contacts/contacts.html'
})
export class ContactsPage {
  bindModelData: any;
  actionSheet: ActionSheet;
  contacts = [];
  campaigns;
  groups;
  loading;
  campaign_id = '';
  group_id = '';
  contact_search = '';
  contact = {id : 0};

  constructor(private nav: NavController, confData: ConferenceData,private userData: UserData) {
    this.showLoader();

    userData.getGroups().then(groups=>{
    	let resultData;
        resultData = groups;
    	this.groups = resultData.user_groups;
    	console.log(this.groups);
    	userData.getCampaigns().then(campaigns=>{
	    	let resultData;
	        resultData = campaigns;
	    	this.campaigns = resultData.campaigns;
	    	this.hideLoader();
    	});
    });
  }

  	onSearch(form){
  		console.log(form);
  		console.log(this.contact_search);
  		console.log(this.group_id);
  		console.log(this.campaign_id);
  		this.showLoader();
  		this.userData.searchContacts(this.contact_search,this.group_id,this.campaign_id).then(contactData=>{
  			console.log("here in results");
  			setTimeout(() => {
				this.hideLoader();
		     }, 1000);
	    	let resultData;
	        resultData = contactData;
	        console.log(resultData.status);
	        if(resultData.status == 201){
	        	this.contacts = [];
	        	this.doAlert("Information","No results found");
	        } else if(resultData.status == 200){
	        	console.log("herer in else");
	        	console.log(resultData.user_contacts);
	        	this.contacts = resultData.user_contacts;
	        	console.log("contact list");
	        	console.log(this.contacts);
	        }  else{
	        	this.doAlert("Information","Access denied");
	        	this.userData.logout();
	        	this.nav.push(LoginPage);
        		this.nav.setRoot(LoginPage);
	        }	    	
    	});
  	}
  	editContact(contact_id){
  		console.log(contact_id);
  	}
  	onClear(form){
  		this.contact_search = '';
  		this.group_id = '';
  		this.campaign_id = '';
  		console.log("hererrrrr");																
  	}
	showLoader(){
	    this.loading = Loading.create({
	      content: 'Please wait...',
	    });
	    console.log("here in load");
	    this.nav.present(this.loading);
	}

	hideLoader(){
		this.loading.dismiss();
		this.loading.dismiss();
	}

	doAlert(type,message) {
	    let alert = Alert.create({
	      title: type,
	      subTitle: message,
	      buttons: ['OK']
	    });
	    this.nav.present(alert);
  }
}