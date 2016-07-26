import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { AddContactPage } from '../addcontact/addcontact';


@Component({
    templateUrl: 'build/pages/noMatch/noMatch.html'
})

export class noMatch{
    responseData = {};
    selectedContact = {};
    constructor(private navParams: NavParams,private nav: NavController,private confData: UserData){
        console.log('response from No Match ......');
        let messageDetail = navParams.data;
        this.confData.getResponseDetail(messageDetail.message,messageDetail.type).then(res => {
            console.log('######---- response data from No Match ---- #######');
            console.log(res);
            let data = res;
            this.responseData = data;
//            this.hideLoader();
        });
    }
    onChanges(data){
        console.log('Selected email ID DATA ::');
        console.log(data);
        this.selectedContact = data;
    }

    sendSelect(){
      console.log("Send selected console data");
      console.log(this.selectedContact);
        this.confData.sendNoMatchContact(this.selectedContact).then(res =>{
            console.log('******************');
            console.log(res);
        });
    }
    addNewContact(){
        console.log('adding new contact ');
        this.nav.push(AddContactPage , {email: this.selectedContact['email']});
    }
}