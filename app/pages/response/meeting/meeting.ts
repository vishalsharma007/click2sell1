import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';

@Component({
    templateUrl: 'build/pages/response/meeting/meeting.html'
})
export class Meeting{
    responseData = {};
    loading;
    startDate: string = '15-02-2011';
    timepickerEnd: string = '2016-01-01T15:30';
    timepickerStart: string = '2016-01-01T15:30';
    constructor(private navParams: NavParams,private nav: NavController, private confData: UserData){
      console.log('response from meeting ......');
         this.showLoader();
        console.log(navParams.data);
        let messageDetail = navParams.data;
        this.confData.getResponseDetail(messageDetail.user_contact_id,messageDetail.type).then(res => {
            console.log('######---- response data ---- #######');
            console.log(res);
            let data = res;
            this.responseData = data;
            this.startDate = data['start_date'];
            console.log("new data :: ", data['start_date']);
            this.hideLoader();
        });
    }

    onSend(data,startDate,timepickerStart,timepickerEnd){
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

        let startTime = timepickerStart.split('T')[1];
        let endTime = timepickerEnd.split('T')[1];

        console.log(timepickerEnd.split('T')[1]);
        this.confData.sendResponseData(data,startDate,startTime,endTime,'').then(response =>{
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

    onUpdate(data,startDate,timepickerStart,timepickerEnd){
        let startTime = timepickerStart.split('T')[1];
        let endTime = timepickerEnd.split('T')[1];
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
        this.confData.sendResponseData(data,startDate,startTime,endTime,'update').then(response =>{
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
