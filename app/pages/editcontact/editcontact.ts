import { Component } from '@angular/core';

import { NavParams,NavController,Alert,Loading } from 'ionic-angular';
import {ContactsPage} from '../contacts/contacts';
import { MessagesPage } from '../messages/messages';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'build/pages/editcontact/editcontact.html'
})
export class EditContactPage {
  contact: {account_id? : string,firstname?: string, lastname?: string} = {firstname : ''};
  submitted = false;
  groups;
  loading;
  contact_group = '';
  constructor(private nav: NavController, private userData: UserData,private NavParams:NavParams) {
    
   let contactid = NavParams.data.id;
     console.log(contactid);
     userData.getGroups().then(groups=>{
      let resultData;
      resultData = groups;
      console.log(resultData);
      this.groups = resultData.user_groups;
      console.log(this.groups);
      userData.getUserDetails(contactid).then(details=>{
        let resultData;
        resultData = details;
        this.contact = resultData.user_contact
        console.log(resultData);
        this.contact.account_id=contactid;
        console.log("=========================");
      });
    });
   
  }

  onUpdate(form) { 
    console.log(form);
    console.log(this.contact_group)
    console.log("here onUpdate!!");
    this.submitted = true;
    if (form.valid) {
      this.showLoader();
      console.log(this.contact);
      this.userData.updateContact(this.contact, this.contact_group).then(results=>{
        let resultData;
        resultData = results;
        console.log("updated from server!!");
        console.log(resultData);
        this.hideLoader();
        if(resultData.status == 200){
        this.doAlert("Information","Successfully updated")
        }
        else if(resultData.status == 201 && resultData.error){
            this.doAlert("Information","Please select an existing Group or add a new Group");
          }else{

            console.log("i am ffsfsfsfsf")
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
