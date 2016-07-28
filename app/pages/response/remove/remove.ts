import { Component } from '@angular/core';
import {FORM_PROVIDERS, FORM_DIRECTIVES} from '@angular/common';

import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';

import {Editor} from 'primeng/primeng';
import {Header} from 'primeng/primeng';

@Component({
    templateUrl: 'build/pages/response/remove/remove.html',
    providers: [FORM_PROVIDERS],
    directives: [FORM_DIRECTIVES,Editor]
})
export class remove{
    responseData = {};
    loading;
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

    onSend(data){
        console.log('66666666666',data);
        this.showLoader();
        let alert = Alert.create({
            title: 'Success',
            subTitle: 'Request successfully processed!',
            buttons: ['OK']
        });
        let error = Alert.create({
            title: 'Success',
            subTitle: 'Error !!',
            buttons: ['OK']
        });
        this.confData.sendResponseData(data,'','','','').then(response =>{
            this.hideLoader();
            console.log(response['status']);
            let status = response['status'];
            if(status == '200'){
                this.nav.present(alert);
            }else{
                this.nav.present(error);
            }
        });
    }

    onUpdate(data){
        this.showLoader();
        let alert = Alert.create({
            title: 'Success',
            subTitle: 'Request successfully processed!',
            buttons: ['OK']
        });
        let error = Alert.create({
            title: 'Success',
            subTitle: 'Error !!',
            buttons: ['OK']
        });
        this.confData.sendResponseData(data,'','','','update').then(response =>{
            this.hideLoader();
            console.log(response['status']);
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
