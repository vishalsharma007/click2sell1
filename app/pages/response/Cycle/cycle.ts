import { Component } from '@angular/core';
import {FORM_PROVIDERS, FORM_DIRECTIVES} from '@angular/common';

import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';

import {Editor} from 'primeng/primeng';
import {Header} from 'primeng/primeng';

@Component({
    templateUrl: 'build/pages/response/Cycle/cycle.html',
    providers: [FORM_PROVIDERS],
    directives: [FORM_DIRECTIVES,Editor]
})
export class cycle{
    responseData = {};
    loading;
    duration: boolean = false;
    constructor(private navParams: NavParams,private nav: NavController, private confData: UserData){
        console.log('response from meeting ......');
        console.log(navParams.data);
        this.showLoader();
        let messageDetail = navParams.data;
        this.confData.getResponseDetail(messageDetail.user_contact_id,messageDetail.type).then(res => {
            console.log('######---- response data ---- #######');
            console.log(res);
            let data = res;
            this.responseData = data;
            this.hideLoader();
            setTimeout(function(){
                console.log('+++++++++++++++++++++');
                console.log(data['email_message']);
                document.getElementById('ieditor').innerHTML= data['email_message'];
            }, 1000);
        });
    }
    onSend(){
     this.duration = true;
    }
    onUpdate(){
        this.duration = true;
    }

    confirmButton(data){
        this.showLoader();
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
        let email_message = document.getElementById('ieditor').innerHTML;
        console.log(email_message)
        data.action_name = data.response;
        this.confData.sendResponseData(data,'','','','',email_message).then(response =>{
            console.log("---------response-----------");
            console.log(response);

            this.hideLoader();

            let status = response['status'];
            if(status == '200'){
                this.nav.present(alert);
            }else{
                this.nav.present(error);
            }
        });
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
}
