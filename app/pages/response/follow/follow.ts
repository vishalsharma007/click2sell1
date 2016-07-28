import { Component } from '@angular/core';
import { NavParams,ActionSheet,Loading, NavController, Page,Alert } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';

@Component({
    templateUrl: 'build/pages/response/follow/follow.html'
})
export class follow{
    loading;
    responseData = {};
    validation: boolean = true;
    sendSameForm: boolean = true;
    showNextUpdate: boolean = true;
    message_index: number = 1;
    constructor(private navParams: NavParams,private nav: NavController, private confData: UserData){
        console.log('response from follow up ......');
        console.log(navParams.data);
        this.showLoader();
        let messageDetail = navParams.data;
        this.confData.getResponseDetail(messageDetail.user_contact_id,messageDetail.type).then(res => {
            console.log('######---- response data ---- #######');
            console.log(res);
            let data = res;
            this.responseData = data;
            this.hideLoader();
        });
    }

    onCheckClick(data){
        data == true ? this.sendSameForm = false : this.sendSameForm = true;
    }

    onSend(data){
        data.check_sch_follow_1 = this.sendSameForm == true ? 'yes' : 'no';
        if(this.sendSameForm == true){
            data.email_message = data.preview_follow_up_message_1;
        }
        let error = Alert.create({
            title: 'Error !!',
            subTitle: 'Select date for Future Follow Up..',
            buttons: ['OK']
        });
        let alert = Alert.create({
            title: 'Success',
            subTitle: 'Request successfully processed!',
            buttons: ['OK']
        });
        console.log(data.date_follow);
        if(data.date_follow){

            this.confData.sendResponseData(data,'','','','',data.email_message).then(response =>{
                console.log(response['status']);
                let status = response['status'];
                if(status == '200'){
                    this.nav.present(alert);
                }else{
                    this.nav.present(error);
                }
            });
        }else{
            this.nav.present(error);
        }

    }
    onNext(data){
     this.message_index += 1;
       if(this.message_index == 3){
            this.showNextUpdate = false;
        }else if(this.message_index == 2){
            this.showNextUpdate = false;
        }
    }
    onPrevious(){
        if(this.message_index > 1){
            this.message_index--;
        }
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
