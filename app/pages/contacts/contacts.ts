import { Component } from '@angular/core';

import {NavParams, ActionSheet, NavController,Loading, Page,Alert } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

import { UserData } from '../../providers/user-data';
import {EditContactPage} from '../editcontact/editcontact';

import { LoginPage } from '../login/login';

import { Meeting } from '../response/meeting/meeting';
import { cycle } from '../response/Cycle/cycle';
import { noAction } from '../response/noAction/noAction';
import { follow } from '../response/follow/follow';
import { remove } from '../response/remove/remove';
import { inActive } from '../response/inActive/inActive';
import { conversation } from '../response/conversation/conversation';

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
      console.log("calling from contac ::::");
  	let email = NavParams.get("email");
  		if(email !==undefined){
  			email = email.split("<");
  			this.contact_search = email[0];
  		}		
  }

  	onSearch(form){
  		console.log(form);
  		this.showLoader();
  		this.userData.searchContacts(this.contact_search,this.group_id,this.campaign_id).then(contactData=>{
  			console.log("here in results");
  			setTimeout(() => {
				this.hideLoader();
				this.hideSearch = false;
		     }, 1000);
	    	let resultData;
	        resultData = contactData;
	        if(resultData.status == 201){
	        	this.contacts = [];
	        	this.doAlert("Information","No results found");
	        } else if(resultData.status == 200){
	        	this.contacts = resultData.user_contacts;
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

  				let trueData = "User contact has been marked as vip."
  				console.log(vipData['mesage'].replace(/\"/g, "") == trueData)
  			this.hideLoader();
  		});
  	}
  	
  	showOption(contact){
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
            label: 'Forward',
            value: 'forward'
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
                console.log(contact);
                if (data == 'meeting') {
                    this.nav.push(Meeting, {user_contact_id: contact.id, type: data});
                } else if (data == 'cycle') {
                    this.nav.push(cycle, {user_contact_id: contact.id, type: data});
                } else if (data == 'no_action') {
                    //this.nav.push(noAction , {user_contact_id: meetingDetail.user_contact_id,type: data});
                    this.showLoader();
                    let alert = Alert.create({
                        title: 'Success',
                        subTitle: 'Successfully Moved!',
                        buttons: ['OK']
                    });

                    this.userData.getResponseDetail(contact.id, data).then(res => {
                        console.log('######---- response data No Action ---- #######');
                        console.log(res);
                        let data = res;
                        this.hideLoader();
                        this.nav.present(alert);
                    });
                } else if (data == 'inactive') {
                    this.nav.push(inActive, {user_contact_id: contact.id, type: data});
                } else if (data == 'remove') {
                    this.nav.push(remove, {user_contact_id: contact.id, type: data});
                } else if (data == 'conversation') {
                    this.nav.push(conversation, {user_contact_id: contact.id, type: data});

                } else if (data == 'follow_up') {
                    this.nav.push(follow, {user_contact_id: contact.id, type: data});
                } else if (data == "forward") {

                    this.showLoader();
                    let alert = Alert.create({
                        title: 'Success',
                        subTitle: 'Request Successfully recorded.',
                        buttons: ['OK']
                    });

                    this.userData.getResponseDetail(contact.id, data).then(res => {
                        console.log('######---- response data No Action ---- #######');
                        console.log(res);
                        let data = res;
                        this.hideLoader();
                        this.nav.present(alert);
                    });

                }
            }
        });

	    this.nav.present(alert);

  	}


  	editContact(contact_id){
	  		console.log("Here in editContact");
	    	this.nav.push(EditContactPage, {id:contact_id});


  	}
  	onClear(form){
  		this.contact_search = '';
  		this.group_id = '';
  		this.campaign_id = '';
  		console.log("hererrrrr");																
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

	doAlert(type,message) {
	    let alert = Alert.create({
	      title: type,
	      subTitle: message,
	      buttons: ['OK']
	    });
	    this.nav.present(alert);
  }
}