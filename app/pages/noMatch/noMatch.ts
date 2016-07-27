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
    messageId;
    constructor(private navParams: NavParams,private nav: NavController,private confData: UserData){
        console.log('response from No Match ......');
        let messageDetail = navParams.data;
        console.log(messageDetail);
        this.messageId =  messageDetail.message;
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
        let alert = Alert.create({
            title: 'Success',
            subTitle: 'Request successfully processed!',
            buttons: ['OK']
        });
        let error = Alert.create({
            title: 'Error !!',
            subTitle: 'Server Error.. !!',
            buttons: ['OK']
        });
      console.log("Send selected console data");
      console.log(this.selectedContact);
        this.confData.sendNoMatchContact(this.messageId,this.selectedContact).then(res =>{
            console.log('******************');
            console.log(res);
            let status = res['status'];
            if(status == '200'){
                this.nav.present(alert);
            }else{
                this.nav.present(error);
            }
        });
    }
    addNewContact(){
        console.log('adding new contact ');
        this.nav.push(AddContactPage , {email: this.selectedContact['email']});
    }
}