import { Component } from '@angular/core';

import {NavParams, ActionSheet, NavController,Loading, Page,Alert } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

import { UserData } from '../../providers/user-data';
import {EditContactPage} from '../editcontact/editcontact';

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
  hideSearch = true;
  campaign_id = '';
  group_id = '';
  contact_search = '';
  contact = {id : 0,vip:true}; 
  showBack = false;
  // vip_true=true;
  // vip_false=false;
  constructor(private nav: NavController, confData: ConferenceData,private userData: UserData,private NavParams:NavParams) {
  	let email = NavParams.get("email");
  		if(email !==undefined){
  			email = email.split("<");
  			this.contact_search = email[0];
  		}		
  }

  	onSearch(form){
  		this.showLoader();
  		this.userData.searchContacts(this.contact_search,this.group_id,this.campaign_id).then(contactData=>{
  			console.log("here in results");
  			setTimeout(() => {
				this.hideLoader();
				this.hideSearch = false;
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
  	showSearch(){
  		console.log("showSearch clicked");
  		this.hideSearch= !this.hideSearch;
  		this.contacts = [];
  	}
  	changeVipStatus(user_id){
  		console.log(user_id);
  		console.log("bablu");
  		this.showLoader();
  		this.userData.changeVip(user_id).then(vipData=>{
  				console.log("qeqeqeqeqeqweqweqeq");
  				console.log(vipData['mesage'].replace(/\"/g, ""));
  				let trueData = "User contact has been marked as vip."
  				console.log(vipData['mesage'].replace(/\"/g, "") == trueData)
  				// console.log(this.contact);
  				// vipData['mesage'].replace(/\"/g, "") == trueData ? this.vip_true = true : this.vip_false = false;
  				// console.log("this.vip_true");
  				// console.log(this.vip_true);
  				// console.log("this.vip_false");
  				// console.log(this.vip_false);
  			this.hideLoader();
  		});
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
	      value: '2',
	    });

	    alert.addInput({
	      type: 'radio',
	      label: 'Follow Up',
	      value: '3',
	    });

	    alert.addInput({
	      type: 'radio',
	      label: 'Inactive',
	      value: '4',
	    });

	    alert.addInput({
	      type: 'radio',
	      label: 'Remove',
	      value: '5',
	    });

	    alert.addInput({
	      type: 'radio',
	      label: 'Conversation',
	      value: '6',
	    });

	    alert.addInput({
	      type: 'radio',
	      label: 'Enter Activity',
	      value: '7',
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


  	editContact(contact_id){
	  		console.log("Here in editContact");
	    	this.nav.push(EditContactPage, {id:contact_id});
	    	// this.nav.setRoot(EditContactPage, {id:contact_id});
	    

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