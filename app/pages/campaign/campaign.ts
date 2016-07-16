import { Component } from '@angular/core';

import { ActionSheet, NavController, Page,Loading,Alert } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { LoginPage } from '../login/login';
@Component({
  templateUrl: 'build/pages/campaign/campaign.html'
})
export class CampaignPage {
  actionSheet: ActionSheet;
  campaigns = [];
  loading;

  constructor(private nav: NavController, private userData: UserData) {
    this.showLoader();
    userData.getCampaignsData().then(campaigns=>{
	    	let resultData;
	        resultData = campaigns;
	    	this.hideLoader();
	    	if(resultData.status == 201){
	        	this.campaigns = [];
	        	this.doAlert("Information","No results found");
	        } else if(resultData.status == 200) {
	        	console.log("herer in else");
	        	console.log(resultData.campaigns);
	        	this.campaigns = resultData.campaigns;
	        	console.log("contact list");
	        	console.log(this.campaigns);
	        } else{
	        	this.doAlert("Information","Access denied");
	        	userData.logout();
	        	this.nav.push(LoginPage);
        		this.nav.setRoot(LoginPage);
	        }
    });
  }

  changeStatus(id,status,$event) {
  	console.log("changeStatus is called!!")
  	let confirm = Alert.create({
	      title: 'Confirm update',
	      message: 'Do you really want to update status?',
	      buttons: [
	        {
	          text: 'No',
	          handler: () => {
	          	
	          	let oldstatus = !status;
	          	console.log(document.getElementById(id.toString()));
	          	console.log(id.toString())
	          	 document.getElementById(id).setAttribute("checked",oldstatus.toString());
	          }
	        },
	        {
	          text: 'Yes',
	          handler: () => {
	            this.showLoader();
			  	this.userData.updateCampaignStatus(id,status).then(result => {
			  		let resultData;
				        resultData = result;
				    	this.hideLoader();
				    	if(resultData.status == 201){
				        	this.campaigns = [];
				        	this.doAlert("Information","Request not processed");
				        } else if(resultData.status == 200) {
				        	this.doAlert("Information","Campaign status updated");
				        } else{
				        	this.doAlert("Information","Access denied");
				        	this.userData.logout();
				        	this.nav.push(LoginPage);
			        		this.nav.setRoot(LoginPage);
				        }
			  	})
	          }
	        }
	      ]
	    });
	    this.nav.present(confirm);
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