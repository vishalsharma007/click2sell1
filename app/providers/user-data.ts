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
      this.headers.append('apicall',  'true');

      let options = new RequestOptions({
          method: RequestMethod.Get,
          url: 'https://dev.click2sell.com/api_sign_in/create.json',
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
    console.log("setLoginUser hsfsdfdsf");
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
        this.headers.append('apicall',  'true');
        this.headers.append('Authorization','Token token='+token);
        console.log('token here');
        console.log(token);
        console.log('Token token='+token);
        let options = new RequestOptions({
          method: RequestMethod.Get,
          url: 'https://dev.click2sell.com/user_contacts/get_user_contact_group_list.json',
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
        this.headers.append('apicall',  'true');
        this.headers.append('Authorization','Token token='+token);
        console.log(this.headers);
        let options = new RequestOptions({
            method: RequestMethod.Get,
            url: 'https://dev.click2sell.com/campaigns/get_campaign_list.json',
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
        this.headers.append('apicall',  'true');
        this.headers.append('Authorization','Token token='+token);
        console.log(this.headers);
        let options = new RequestOptions({
            method: RequestMethod.Get,
            url: 'https://dev.click2sell.com/campaigns/get_campaign_data.json',
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
      this.headers.append('apicall',  'true');
      this.headers.append('Authorization','Token token='+token);
      console.log(this.headers);
      let options = new RequestOptions({
          method: RequestMethod.Post,
          url: 'https://dev.click2sell.com/campaigns/change_state.json',
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
        this.headers.append('apicall',  'true');
        this.headers.append('Authorization','Token token='+token);
        console.log(this.headers);
        let options = new RequestOptions({
            method: RequestMethod.Get,
            url: 'https://dev.click2sell.com/user_contacts/search_contacts.json',
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
    getMessageData(type) {
        console.log('nav params checking ... on get message data ;;;;');
        let params: URLSearchParams = new URLSearchParams();
//        params.set('contact_search', contact_search);
//        params.set('campaign_id', campaign_id);
//        params.set('group_id', group_id);
        params.set('inbox_type', type);
        return this.getToken().then((userdata) => {
            let data = JSON.parse(userdata);
            let token = data.api_token;
            this.headers = new Headers();
            this.headers.append('apicall',  'true');
            this.headers.append('Authorization','Token token='+token);
            console.log(this.headers);
            let options = new RequestOptions({
                method: RequestMethod.Get,
                url: 'https://dev.click2sell.com/messages_api/get_messages_user.json',
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

    getMessageDetail(id){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        return this.getToken().then((userdata) => {
            let data = JSON.parse(userdata);
            let token = data.api_token;
            this.headers = new Headers();
            this.headers.append('apicall',  'true');
            this.headers.append('Authorization','Token token='+token);
            console.log(this.headers);
            let options = new RequestOptions({
                method: RequestMethod.Get,
                url: 'https://dev.click2sell.com/messages_api/message_show.json',
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
        })
    }

    getMeetingDetail(id){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        return this.getToken().then((userdata) => {
            let data = JSON.parse(userdata);
            let token = data.api_token;
            this.headers = new Headers();
            this.headers.append('apicall',  'true');
            this.headers.append('Authorization','Token token='+token);
            console.log(this.headers);
            let options = new RequestOptions({
                method: RequestMethod.Get,
                url: 'https://dev.click2sell.com/messages_api/view_meeting.json',
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
        })
    }
    getResponseDetail(id,template_name){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        params.set('template_name', template_name);
        console.log("*************** name of templet in api :::");
        console.log(template_name);
        let url =  (template_name == 'forward') ? 'https://dev.click2sell.com/messages_api/forward_message.json' : 'https://dev.click2sell.com/user_contacts/find_template_api.json';
        params.set('template_type', "response");
        return this.getToken().then((userdata) => {
            let data = JSON.parse(userdata);
            let token = data.api_token;
            this.headers = new Headers();
            this.headers.append('apicall',  'true');
            this.headers.append('Authorization','Token token='+token);
            console.log(this.headers);
            let options = new RequestOptions({
                method: RequestMethod.Get,
                url: url,
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
        })
    }
    getMeetingData(){

        return this.getToken().then((userdata) => {
            let data = JSON.parse(userdata);
            let token = data.api_token;
            this.headers = new Headers();
            this.headers.append('apicall',  'true');
            this.headers.append('Authorization','Token token='+token);
            console.log(this.headers);
            let options = new RequestOptions({
                method: RequestMethod.Get,
                url: 'https://dev.click2sell.com/messages_api/get_meeting.json',
                headers: this.headers
            });

            return new Promise(resolve => {
                this.http.request(new Request(options))
                    .subscribe(res => {
                        // we've got back the raw data, now generate the core schedule data
                        // and save the data for later reference
                        resolve(res.json());
                    });
            });
        })
    }

    sendResponseData(form,startDate,timepickerStart,timepickerEnd,bt_nm){


        console.log('inside request::: ',form);
        console.log('inside request::: ',startDate);
        console.log('inside request::: ',timepickerEnd);
        console.log('inside request::: ',timepickerStart);
        console.log('inside request::: ',bt_nm);

        return this.getToken().then((userdata) => {
            let data = JSON.parse(userdata);
            let token = data.api_token;
            let params: URLSearchParams = new URLSearchParams();

            params.set('user_domain', form.user_domain);
            params.set('added_contacts', form.added_contacts);

            params.set("message['user_contact_id']", form.user_contact_id);
            params.set("message['account_id']", form.account_id);

            params.set('action_name', form.action_name);
            params.set('response', form.response);
            params.set('bt_nm', bt_nm);
            params.set('account_zone', form.account_zone);
            params.set('date', startDate);
            params.set('timepicker_start', timepickerStart);
            params.set('timepicker_end', timepickerEnd);
            params.set('location', form.location);
            params.set('mess_subject', form.mess_subject);
            params.set('email_message', form.email_message);
            params.set('other_reason', form.action_name == 'other' ? form.other_reason : '');


            this.headers = new Headers();
            this.headers.append('apicall',  'true');
            this.headers.append('Authorization','Token token='+token);
            console.log(this.headers);
            let options = new RequestOptions({
                method: RequestMethod.Post,
                url: 'https://dev.click2sell.com/messages_api/reply_action_api.json',
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
        })
    }
  addContact(formData, group_name){
  let params: URLSearchParams = new URLSearchParams();
    console.log("hello add contacts");
    console.log(formData);
    console.log("contact_group");
    console.log(group_name)
      for (var key in formData) {
      if (formData.hasOwnProperty(key)) {
        params.set('user_contact['+key+']', formData[key]);
      }
    }

    params.set('contact_group', group_name);

      return this.getToken().then((userdata) => {
      let data = JSON.parse(userdata);
      let token = data.api_token;
      console.log("token");
      console.log(token);
      this.headers = new Headers();
      this.headers.append('apicall',  'true');
      this.headers.append('Authorization','Token token='+token);
      console.log(this.headers);
      console.log("dfdfs");
      console.log(params);
      let options = new RequestOptions({
          method: RequestMethod.Post,
          url: 'https://dev.click2sell.com/user_contacts/create_contact.json',
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

  getUserDetails(user_id){
  let params: URLSearchParams = new URLSearchParams();
    console.log("hello viewUserDetails");
    console.log(user_id);
    params.set('id', user_id);
      return this.getToken().then((userdata) => {
      let data = JSON.parse(userdata);
      let token = data.api_token;
      console.log("token");
      console.log(token);
      this.headers = new Headers();
      this.headers.append('apicall',  'true');
      this.headers.append('Authorization','Token token='+token);
      console.log(this.headers);
      console.log("below Authorization page");
      let options = new RequestOptions({
          method: RequestMethod.Get,
          url: 'https://dev.click2sell.com/user_contacts/get_contact.json',
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

  updateContact(formData, group_name){
  let params: URLSearchParams = new URLSearchParams();
    console.log("hello  updateContact");
    console.log(formData);
    console.log("contact_group");
    console.log(group_name)
      for (var key in formData) {
      if (formData.hasOwnProperty(key)) {
        params.set('user_contact['+key+']', formData[key]);
      }
    }

    params.set('contact_group', group_name);

      return this.getToken().then((userdata) => {
      let data = JSON.parse(userdata);
      let token = data.api_token;
      console.log("token");
      console.log(token);
      this.headers = new Headers();
      this.headers.append('apicall',  'true');
      this.headers.append('Authorization','Token token='+token);
      console.log(this.headers);
      console.log("dfdfs");
      console.log(params);
      let options = new RequestOptions({
          method: RequestMethod.Post,
          url: 'https://dev.click2sell.com/user_contacts/update_contact.json',
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



}


