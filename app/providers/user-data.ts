import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events, LocalStorage, Storage } from 'ionic-angular';
import { Headers, RequestOptions,Request,Response,RequestMethod,URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class UserData {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(LocalStorage);
  headers;
  options;
  userdata;

  constructor(private events: Events,private http: Http ) {}

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(username,password) {
      console.log(username+""+password)
      let params: URLSearchParams = new URLSearchParams(); 
      params.set('login[email]', username);
      params.set('login[password]', password);
      this.headers = new Headers();
      this.headers.append('api_call',  'true');

      let options = new RequestOptions({
          method: RequestMethod.Get,
          url: 'http://vsharmademoapp.pagekite.me/api_sign_in/create.json',
          headers: this.headers,
          search: params
      });

      return new Promise(resolve => {
        this.http.request(new Request(options))
        .subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        resolve(res.json());
        });
      }); 
  }

  setLoginUser(user){
    console.log("hsfsdfdsf");
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('userdata', JSON.stringify(user));
    this.events.publish('user:login');
  }

  logError(err){
  //doAlert('Error','Server Problem. Please try again.')
  }

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('userdata');
    this.events.publish('user:logout');
  }

  setUsername(username) {
    this.storage.set('username', username);
  }

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  getToken() {
    return this.storage.get('userdata').then((value) => {
      return value;
    });
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }

  getGroups() {
      return this.getToken().then((userdata) => {
        let data = JSON.parse(userdata);
        let token = data.api_token;
        this.headers = new Headers();
        this.headers.append('api_call',  'true');
        this.headers.append('Authorization','Token token='+token);
        console.log('token here');
        console.log(token);
        console.log('Token token='+token);
        let options = new RequestOptions({
          method: RequestMethod.Get,
          url: 'http://vsharmademoapp.pagekite.me/user_contacts/get_user_contact_group_list.json',
          headers: this.headers,
        });

        return new Promise(resolve => {
          this.http.request(new Request(options))
          .subscribe(res => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(res.json());
          });
        });
      });                
  }

  getCampaigns() {
      return this.getToken().then((userdata) => {
        let data = JSON.parse(userdata);
        let token = data.api_token;
        this.headers = new Headers();
        this.headers.append('api_call',  'true');
        this.headers.append('Authorization','Token token='+token);
        console.log(this.headers);
        let options = new RequestOptions({
            method: RequestMethod.Get,
            url: 'http://vsharmademoapp.pagekite.me/campaigns/get_campaign_list.json',
            headers: this.headers,
        });

        return new Promise(resolve => {
          this.http.request(new Request(options))
          .subscribe(res => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(res.json());
          });
        });
      });          
  }

    getCampaignsData() {
      return this.getToken().then((userdata) => {
        let data = JSON.parse(userdata);
        let token = data.api_token;
        this.headers = new Headers();
        this.headers.append('api_call',  'true');
        this.headers.append('Authorization','Token token='+token);
        console.log(this.headers);
        let options = new RequestOptions({
            method: RequestMethod.Get,
            url: 'http://vsharmademoapp.pagekite.me/campaigns/get_campaign_data.json',
            headers: this.headers,
        });

        return new Promise(resolve => {
          this.http.request(new Request(options))
          .subscribe(res => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(res.json());
          });
        });
      });          
  }

    updateCampaignStatus(id,status) {
      let params: URLSearchParams = new URLSearchParams(); 
      params.set('active_state', status);
      params.set('id', id);
      return this.getToken().then((userdata) => {
      let data = JSON.parse(userdata);
      let token = data.api_token;
      this.headers = new Headers();
      this.headers.append('api_call',  'true');
      this.headers.append('Authorization','Token token='+token);
      console.log(this.headers);
      let options = new RequestOptions({
          method: RequestMethod.Post,
          url: 'http://vsharmademoapp.pagekite.me/campaigns/change_state.json',
          headers: this.headers,
          search : params
      });

      return new Promise(resolve => {
        this.http.request(new Request(options))
        .subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        resolve(res.json());
        });
      });
    });          
  }

  searchContacts(contact_search,group_id,campaign_id) {
      let params: URLSearchParams = new URLSearchParams(); 
      params.set('contact_search', contact_search);
      params.set('campaign_id', campaign_id);
      params.set('group_id', group_id);
      return this.getToken().then((userdata) => {
        let data = JSON.parse(userdata);
        let token = data.api_token;
        this.headers = new Headers();
        this.headers.append('api_call',  'true');
        this.headers.append('Authorization','Token token='+token);
        console.log(this.headers);
        let options = new RequestOptions({
            method: RequestMethod.Get,
            url: 'http://vsharmademoapp.pagekite.me/user_contacts/search_contacts.json',
            headers: this.headers,
            search: params
        });

        return new Promise(resolve => {
          this.http.request(new Request(options))
          .subscribe(res => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(res.json());
          });
        });
      });          
  } 

}

