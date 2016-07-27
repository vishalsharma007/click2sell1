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
  contact_group ;
  contactid;
  constructor(private nav: NavController, private userData: UserData,private NavParams:NavParams) {
    
    this.contactid = NavParams.data.id;
     console.log(this.contactid);
     userData.getGroups().then(groups=>{
      let resultData;
      resultData = groups;
      this.groups = resultData.user_groups;
       // console.log(this.groups)
      console.log("this.groups");
      console.log(this.groups);
      this.showLoader();
      userData.getUserDetails(this.contactid).then(details=>{

        let resultData;
        resultData = details;
        console.log(resultData);
        console.log("this will be deleted!!");
        console.log(resultData.user_contact.id);
        console.log(resultData.user_contact_group_name);
        console.log(resultData.user_contact_group_id);
        delete resultData.user_contact.id;
        delete resultData.user_contact.updated_at;
        delete resultData.user_contact.created_at;
          if(resultData.user_contact.city == null) resultData.user_contact.city = "";
          if(resultData.user_contact.firstname == null) resultData.user_contact.firstname = "";
          if(resultData.user_contact.lastname == null) resultData.user_contact.lastname = "";
          if(resultData.user_contact.phone == null) resultData.user_contact.phone = "";
          if(resultData.user_contact.state == null) resultData.user_contact.state = "";
          if(resultData.user_contact.title == null) resultData.user_contact.title = "";
          if(resultData.user_contact.zip_code == null) resultData.user_contact.zip_code = "";
          if(resultData.user_contact.address1 == null) resultData.user_contact.address1 = "";
          if(resultData.user_contact.address2 == null) resultData.user_contact.address2 = "";
           this.groups.user_group = resultData.user_contact_group_name;
           console.log(this.groups.user_group)
        this.contact = resultData.user_contact;
        this.contact_group = resultData.user_contact_group_name;
        this.hideLoader();
        console.log(resultData);   
        // this.contact.id=contactid;
        console.log("=========================");
      });
      
    });
   
  }

  onUpdate(form,contact_group) { 
    console.log(form);
    console.log(contact_group);
    console.log("here onUpdate!!");
    console.log("this.contact_group");
    console.log(contact_group);
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

        // this.doAlert("Information","Successfully updated");


          this.nav.pop();

        }else if(resultData.status == 201 && resultData.error){
            this.doAlert("Information","Please select an existing Group or add a new Group");
          }else if(resultData.status == 500){
            this.doAlert("Error","Your email Id contain special character!!");
          }

          else{

            console.log("i am else");
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
