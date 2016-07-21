import { Component } from '@angular/core';

import { NavParams,NavController,Alert,Loading } from 'ionic-angular';
import {ContactsPage} from '../contacts/contacts';
import { MessagesPage } from '../messages/messages';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'build/pages/editcontact/editcontact.html'
})
export class EditContactPage {
  contact: {id? : string,firstname?: string, lastname?: string} = {firstname : ''};
  submitted = false;
  groups;
  loading;
  contact_group = '';
  contactid;
  constructor(private nav: NavController, private userData: UserData,private NavParams:NavParams) {
    
    this.contactid = NavParams.data.id;
     console.log(this.contactid);
     userData.getGroups().then(groups=>{
      let resultData;
      resultData = groups;
      console.log(resultData);
      this.groups = resultData.user_groups;
      console.log(this.groups);
      this.showLoader();
      userData.getUserDetails(this.contactid).then(details=>{

        let resultData;
        resultData = details;
        console.log("this will be deleted!!");
        console.log(resultData.user_contact.id);
        delete resultData.user_contact.id;
        delete resultData.user_contact.updated_at;
        delete resultData.user_contact.created_at;
        this.contact = resultData.user_contact;
        this.hideLoader();
        console.log(resultData);   
        // this.contact.id=contactid;
        console.log("=========================");
      });
      
    });
   
  }

  onUpdate(form) { 
    console.log(form);
    console.log(this.contact_group)
    console.log("here onUpdate!!");
    // console.log(this.contact.id);
    this.submitted = true;
    if (form.valid) {
      this.showLoader();
      console.log(this.contact);
      this.userData.updateContact(this.contact, this.contact_group, this.contactid).then(results=>{
        let resultData;
        resultData = results;
        console.log("updated from server!!");
        console.log(resultData);
        this.hideLoader();
        if(resultData.status == 200){

        this.doAlert("Information","Successfully updated");


          // this.nav.pop();

        }else if(resultData.status == 201 && resultData.error){
            this.doAlert("Information","Please select an existing Group or add a new Group");
          }else{

            console.log("i am ffsfsfsfsf");
          }
            // this.nav.pop();
          // this.nav.pop();
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
