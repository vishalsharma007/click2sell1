import { Component } from '@angular/core';

import { NavController,Alert,Loading } from 'ionic-angular';

import { MessagesPage } from '../messages/messages';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'build/pages/addcontact/addcontact.html'
})
export class AddContactPage {
  contact: {firstname?: string, lastname?: string} = {firstname : ''};
  submitted = false;
  groups;
  loading;
  contact_group = '';
  constructor(private nav: NavController, private userData: UserData) {
    userData.getGroups().then(groups=>{
      let resultData;
      resultData = groups;
      console.log(resultData);
      this.groups = resultData.user_groups;
      console.log(this.groups);
    });
  }

  onCreate(form) {
    console.log(this.contact_group);
    console.log("here OnCreate!!");
    this.submitted = true;
    if (form.valid) {
      this.showLoader();
      console.log(this.contact);
      this.userData.addContact(this.contact, this.contact_group).then(results=>{
        let resultData;
        resultData = results;
        this.hideLoader();
        if(resultData.status == 200){
        this.doAlert("Information","Successfully Created")
        }
        else if(resultData.status == 201 && resultData.error){
            this.doAlert("Information","Please select an existing Group or add a new Group");
          }else{

            console.log("i am herere")
          }

      });
      
    }
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
