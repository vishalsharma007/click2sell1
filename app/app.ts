import { Component, ViewChild } from '@angular/core';

import { Events, ionicBootstrap, MenuController, Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

import { AccountPage } from './pages/account/account';
import { ContactsPage } from './pages/contacts/contacts';
import { CampaignPage } from './pages/campaign/campaign';
import { ConferenceData } from './providers/conference-data';
import { LoginPage } from './pages/login/login';
import { AddContactPage } from './pages/addcontact/addcontact';
import { MessagesPage } from './pages/messages/messages';
import { UserData } from './providers/user-data';
import { MessageData } from './providers/message-data';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
  param? : string;
}

@Component({
  templateUrl: 'build/app.html'
})
class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  messagePages: PageObj[] = [

    { title: 'Inbox', component: MessagesPage, icon: 'filing',param:'main-inbox' },
      { title: 'Meetings', component: MessagesPage, icon: 'chatboxes',param:'meetings' },
    //{ title: 'Meetings', component: MessagesPage, index: 1, icon: 'information-
    //circle' },
    //{ title: 'Deleted Meetings', component: MessagesPage, index: 2, icon: 
    //'information-circle' },
    { title: 'Follow up', component: MessagesPage, index: 3, icon: 'thumbs-up',param: 'follow-up' },
    { title: 'Cycle', component: MessagesPage, index: 3, icon: 'repeat', param: 'cycle'},
    { title: 'Inactive', component: MessagesPage, index: 3, icon: 'warning',param: 'inactive' },
    { title: 'Remove', component: MessagesPage, index: 3, icon: 'remove-circle', param: 'remove' },
    { title: 'Ok, I got it', component: MessagesPage, index: 3, icon: 'walk', param: 'ok-message' },
    { title: 'Spam', component: MessagesPage, index: 3, icon: 'information-circle' , param: 'spam' },

  ];
  contactPages: PageObj[] = [
    { title: 'Contacts', component: ContactsPage, icon: 'contacts' },
    { title: 'Add Contact', component: AddContactPage, index: 1, icon: 'person-add' }
  ];
  campaignPages : PageObj[] = [
    { title: 'Campaigns', component: CampaignPage, icon: 'calendar' },
  ];
  loggedInPages: PageObj[] = [
    { title: 'Account', component: AccountPage, icon: 'person' },
    { title: 'Logout', component: LoginPage, icon: 'log-out' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
  ];
  rootPage: any = LoginPage;

  constructor(
    private events: Events,
    private userData: UserData,
    private menu: MenuController,
    platform: Platform,
    confData: ConferenceData
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === 'true');
    });

    this.listenToLoginEvents();
  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    console.log(page);
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index ,type: page.param});
      console.log("in maine root");
        console.log("on click tab param : ::::: ", page.param);
        console.log(page.component);
    } else {
      console.log('in other root')
        console.log("on click tab param : ::::: ", page.param);
      this.nav.setRoot(page.component,{type: page.param});
      console.log(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
        this.nav.push(LoginPage);
        this.nav.setRoot(LoginPage,{type:'inbox'});
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}


// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
// Place the tabs on the bottom for all platforms
// See the theming docs for the default values:
// http://ionicframework.com/docs/v2/theming/platform-specific-styles/

ionicBootstrap(ConferenceApp, [ConferenceData, UserData], {
  tabbarPlacement: 'bottom'
});
