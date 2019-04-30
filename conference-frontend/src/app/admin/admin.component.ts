import { Component, OnInit } from '@angular/core';
import {AdminService} from './admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {EventService} from '../event/event.service';
import {EventModel} from '../event/event.model';
import {MatSnackBar} from '@angular/material';
import {ImageSnippet} from '../event/event.model';
import {SpeakerModel} from '../speaker/speaker.model';
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
  speakerCount;
  count = 0;
  scount = 0;
  events;
  speakers;
  userOptions = 'profile';
  eventInfoForm: FormGroup;
  speakerInfoForm: FormGroup;
  isAddNewEvent = false;
  isAddNewSpeaker = false;
  eventPictureFile: ImageSnippet;
  eventPictureFileString;
  uploadedAgenda;
  id: number;
  agenda: string|any;
  private snackBar: MatSnackBar;
  // wideScreen: ' .wideScreen { width: 70vw;}';

  constructor(
    private adminService: AdminService,
    private eventService: EventService,
    private fb: FormBuilder,
  ) { }
  navigateProfile(options: string) {
    this.userOptions = options;
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log(file, 'event image');
    const reader = new FileReader();
    this.eventPictureFileString = file;
    reader.onload = ((event: any) => {
        this.eventPictureFile = new ImageSnippet(event.target.result, file);
        this.eventPictureFile.pending = true;
        // this.isUploadButtonDisabled = false;
      }
    );
    reader.readAsDataURL(file);
  }
  onAgendaFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file, file.valueOf());
      this.uploadedAgenda = file;
    }
  }
  addEventModal() {
    this.isAddNewEvent = true;
  }
  addSpeakerModal() {
    this.isAddNewSpeaker = true;
  }
  cancelAddingEvent() {
    this.isAddNewEvent = false;
  }
  cancelAddingSpeaker() {
    this.isAddNewSpeaker = false;
  }
  addNewSpeaker() {
    const s_info = this.speakerInfoForm.value;
    const speaker: SpeakerModel = {
      // id: 0,
      eventId: s_info['eventId'],
      speakerName: s_info['speakerName'],
      speakerTopic: s_info['speakerTopic'],
      speakerPicture: s_info['speakerPicture'],
      speakerAdditionalPicture: s_info['speakerAdditionalPicture'],
      speakerBio: s_info['speakerBio'],
      speakerSlides: s_info['speakerSlides']
    };
    this.eventService.createSpeaker(speaker).then((res) => {
      this.isAddNewSpeaker = false;
      console.log('speaker created');
    }).catch((err) => {
      console.log(err);
    })
  }
  addNewEvent() {
    const e_info = this.eventInfoForm.value;
    // need to figure out how to add the picture to the local db
    const event: EventModel = {
      eventName:  e_info['eventName'],
      eventTopic: e_info['eventTopic'],
      eventOrganizer: e_info['eventOrganizer'],
      eventStartDate: e_info['eventStartDate'],
      eventEndDate: e_info['eventEndDate'],
      eventDescription: e_info['eventDescription'],
      eventAgenda: this.uploadedAgenda.name,
      eventMap: e_info['eventMap'],
      eventPicture: this.eventPictureFileString.lastModified + '-' + this.eventPictureFileString.name,
      eventLocation: e_info['eventLocation'],
    };
    this.eventService.createEvent(event).then((res) => {
      this.isAddNewEvent = false;
      console.log('event created');
      // this is getting empty and sending empty string to the db
      // this.eventService.uploadEventPicture(this.eventPictureFile.file).then((res) => {
      //   console.log('picture uploaded' + this.eventPictureFile + this.eventPictureFile.file);
      // }).catch((err) => {
      //   console.log(err);
      // });
    }).catch((err) => {
      console.log(err);
    });
  }
  updateEventInfo(id: number, index: number) {
    console.log('sajdba' + JSON.stringify(id) + id);
    const e_info = this.eventInfoForm.value;

    if (e_info['eventName'] === '') {
      e_info['eventName'] = this.events.events[index].eventName;
    }
    if (e_info['eventTopic'] === '') {
      e_info['eventTopic'] = this.events.events[index].eventTopic;
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
  updateSpeakerInfo(id: number, index: number) {
    const s_info = this.speakerInfoForm.value;
    if (s_info['eventId'] === '') {
      s_info['eventId'] = this.speakers.speaker[index].eventId;
    }
    if (s_info['speakerName'] === '') {
      s_info['speakerName'] = this.speakers.speaker[index].speakerName;
    }
    if (s_info['speakerTopic'] === '') {
      s_info['speakerTopic'] = this.speakers.speaker[index].speakerTopic;
    }
    if (s_info['speakerPicture'] === '') {
      s_info['speakerPicture'] = this.speakers.speaker[index].speakerPicture;
    }
    if (s_info['speakerAdditionalPicture'] === '') {
      s_info['speakerAdditionalPicture'] = this.speakers.speaker[index].speakerAdditionalPicture;
    }
    if (s_info['speakerBio'] === '') {
      s_info['speakerBio'] = this.speakers.speaker[index].speakerBio;
    }
    if (s_info['speakerSlides'] === '') {
      s_info['speakerSlides'] = this.speakers.speaker[index].speakerSlides;
    }

    const body = {
      // id: 0,
      eventId: s_info['eventId'],
      speakerName: s_info['speakerName'],
      speakerTopic: s_info['speakerTopic'],
      speakerPicture: s_info['speakerPicture'],
      speakerAdditionalPicture: s_info['speakerAdditionalPicture'],
      speakerBio: s_info['speakerBio'],
      speakerSlides: s_info['speakerSlides']
    };
    this.eventService.updateSpeaker(JSON.stringify(id), body).then((res) => {
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  }
  deleteEvent(id: number, index: number) {
    this.eventService.removeEvent(JSON.stringify(id)).then((res) => {
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  }
  deleteSpeaker(id: number, index: number) {
    this.eventService.removeSpeaker(JSON.stringify(id)).then((res) => {
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  }
  unregisterAll(eventId: number) {
    const body = '';
    this.eventService.unregisterAllUsers(JSON.stringify(eventId)).then((res) => {
      console.log('unregistered all users');
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
    this.eventService.getAllSpeakers().then((res)  => {
      this.speakers =  res;
      console.log(this.speakers);
      this.scount = Object.keys(this.speakers.speaker).length;
      // @ts-ignore
      this.speakerCount = Array(this.scount).fill().map((x,j) => j);
    }).catch((err) => {
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
    this.speakerInfoForm =  this.fb.group({
      eventId: ['', [Validators.required]],
      speakerName: ['', [Validators.required]],
      speakerTopic: ['', [Validators.required]],
      speakerPicture: ['', [Validators.required]],
      speakerAdditionalPicture: ['', [Validators.required]],
      speakerBio: ['', [Validators.required]],
      speakerSlides: ['', [Validators.required]]
    });
  }

}
