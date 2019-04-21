import { Component, OnInit } from '@angular/core';
import {AdminService} from './admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
// import {ImageSnippet} from '../event/event.model';
import {EventService} from './../event/event.service';
// import {stringify} from "querystring";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  styles: [ '.wideScreen { width: 75vw;}']
})
export class AdminComponent implements OnInit {
  backendUrl = environment.backendUrl;
  eventCount;
  count = 0;
  events;
  userOptions = 'profile';
  eventInfoForm: FormGroup;
  // wideScreen: ' .wideScreen { width: 70vw;}';

  constructor(
    private adminService: AdminService,
    private eventService: EventService,
    private fb: FormBuilder,
  ) { }
  navigateProfile(options: string) {
    this.userOptions = options;
  }
  updateEventInfo(id: number, index: number) {
    console.log('sajdba' + JSON.stringify(id) + id);
    const e_info = this.eventInfoForm.value;

    if (e_info['eventName'] === '') {
      e_info['eventName'] = this.events.events[index].eventName;
    }
    if (e_info['lasttName'] === '') {
      e_info['eventTopic'] = this.events.events[index].lastName;
    }
    if (e_info['eventOrganizer'] === '') {
      e_info['eventOrganizer'] = this.events.events[index].eventOrganizer;
    }
    if (e_info['eventStartDate'] === '') {
      e_info['eventStartDate'] = this.events.events[index].eventStartDate;
    }
    if (e_info['eventEndDate'] === '') {
      e_info['eventEndDate'] = this.events.events[index].eventEndDate;
    }
    if (e_info['roleAtDistrict'] === '') {
      e_info['roleAtDistrict'] = this.events.events[index].roleAtDistrict;
    }
    if (e_info['eventLocation'] === '') {
      e_info['eventLocation'] = this.events.events[index].eventLocation;
    }
    if (e_info['eventPicture'] === '') {
      e_info['eventPicture'] = this.events.events[index].eventPicture;
    }
    if (e_info['eventDescription'] === '') {
      e_info['eventDescription'] = this.events.events[index].eventDescription;
    }
    if (e_info['eventAgenda'] === '') {
      e_info['eventAgenda'] = this.events.events[index].eventAgenda;
    }
    if (e_info['eventMap'] === '') {
      e_info['eventMap'] = this.events.events[index].eventMap;
    }
    const body = {
      eventName: e_info['eventName'],
      eventTopic: e_info['eventTopic'],
      eventOrganizer: e_info['eventOrganizer'],
      eventStartDate: e_info['eventStartDate'],
      eventEndDate: e_info['eventEndDate'],
      eventLocation: e_info['eventLocation'],
      eventPicture: e_info['eventPicture'],
      eventDescription: e_info['eventDescription'],
      eventAgenda: e_info['eventAgenda'],
      eventMap: e_info['eventMap'],
    };
    console.log(body);
    this.eventService.updateEvent(JSON.stringify(id), body).then((res) => {
      console.log('sajdba' + id + body);
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  }
  ngOnInit() {
    this.eventService.getAllEvents().then(res => {
      this.events = res;
      console.log(this.events);
      this.count = Object.keys(this.events.events).length;
      console.log(this.count);
      // @ts-ignore
      this.eventCount = Array(this.count).fill().map((x, i) => i);
      console.log(this.eventCount);
      this.eventCount.shift();
    }).catch( (err) => {
      console.log(err);
    });

    this.eventInfoForm = this.fb.group({
      eventName: ['', [Validators.required]],
      eventTopic: ['', [Validators.required]],
      eventOrganizer: ['', [Validators.required]],
      eventStartDate: ['', [Validators.required]],
      eventEndDate: ['', [Validators.required]],
      eventLocation: ['', [Validators.required]],
      eventPicture: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      eventAgenda: ['', [Validators.required]],
      eventMap: ['', [Validators.required]]
    });
  }

}
