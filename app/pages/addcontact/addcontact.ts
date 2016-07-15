import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { MessagesPage } from '../messages/messages';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'build/pages/addcontact/addcontact.html'
})
export class AddContactPage {
  contact: {firstname?: string, lastname?: string} = {};
  
  submitted = false;
  constructor(private nav: NavController, private userData: UserData) {}

  onCreate(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.contact.firstname);
      this.nav.push(MessagesPage);
    }
  }
}
