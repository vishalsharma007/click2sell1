import { Component } from '@angular/core';

import { NavController,Alert,Loading } from 'ionic-angular';

import { ContactsPage } from '../contacts/contacts';
import { MessagesPage } from '../messages/messages';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {username : 'vsharma@enbake.com',password: '123123'};
  submitted = false;
  loading;
  constructor(private nav: NavController, private userData: UserData) {}

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.nav.push(ContactsPage);
      //this.showLoader();
      this.userData.login(this.login.username,this.login.password).then(results=>{
        this.hideLoader();
        let resultData;
        resultData = results;
        console.log(resultData);
        if(resultData.success == true){
          this.userData.setLoginUser(resultData.user);
          this.nav.push(ContactsPage);
        } else{
          this.doAlert('Error','Invalid username/password. Please try again.');
        }
      });
    }
  }

  doAlert(type,message) {
    let alert = Alert.create({
      title: type,
      subTitle: message,
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

  showLoader(){
    this.loading = Loading.create({
      content: 'Please wait...',
    });
    this.nav.present(this.loading);
  }

  hideLoader(){
    this.nav.remove(this.loading)
  }

}
