import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';

@Component({
    templateUrl: 'build/pages/response/inActive/inActive.html'
})
export class inActive{
    responseData = {};
    loading;

    showText: boolean = true;
    constructor(private navParams: NavParams,private nav: NavController, private confData: UserData){
        console.log(navParams.data);
        this.showLoader();
        let messageDetail = navParams.data;
        this.confData.getResponseDetail(messageDetail.user_contact_id,messageDetail.type).then(res => {
            console.log(res);
            let data = res;
            this.responseData = data;
            this.hideLoader();
        });
    }
    onChanges(data){
        console.log(data);
      if(data == 'other'){
           this.showText = false;
       }else{
          this.showText = true;
      }
    }

    onSend(data){
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
            title: 'Error !!',
            subTitle: 'Server Error.. !!',
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
