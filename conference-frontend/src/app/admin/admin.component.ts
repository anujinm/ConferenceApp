/*This file has a lot of short functions that just contain a dialogue*/

//imports
import { Component, Inject, OnInit } from '@angular/core';
import {AdminService} from './admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {EventService} from '../event/event.service';
import {EventModel} from '../event/event.model';
import {MatSnackBar} from '@angular/material';
import {ImageSnippet} from '../event/event.model';
import {SpeakerModel} from '../speaker/speaker.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileService } from './../profile/profile.service';

// import {stringify} from "querystring";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  styles: [ '.wideScreen { width: 75vw;}']
})
export class AdminComponent implements OnInit {
  //note: some of these may not be necessary
  attendees;
  eventId = '';
  backendUrl = environment.backendUrl;
  eventCount;
  speakerCount;
  count = 0;
  scount = 0;
  events;
  speakers;
  userOptions = 'profile';
  eventInfoForm: FormGroup;
  eventMapForm: FormGroup;
  eventAgendaForm: FormGroup;
  speakerInfoForm: FormGroup;
  isAddNewEvent = false;
  isAddNewSpeaker = false;
  eventPictureFile: ImageSnippet;
  speakerPictureFile: ImageSnippet;
  uploadedAgenda;
  id: number;
  agenda: string|any;
  showDialog = false;
  dialogMessage = '';
  eventIdToDelete: number;
  eventIdToUnregister: number;
  isDeleteEventDialog = false;
  isUnregisterAllDialog = false;

  //make private variables
  constructor(
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private eventService: EventService,
    private fb: FormBuilder,
    private profileService: ProfileService,
  ) { }
  //dialogue for delete
  onEventDelete(message: string, id: number) {
    this.isDeleteEventDialog = true;
    this.showDialog = true;
    this.dialogMessage = message;
    this.eventIdToDelete = id;
  }
  onUnregisterAll(message: string, id: number) {
    this.isUnregisterAllDialog = true;
    this.showDialog = true;
    this.dialogMessage = message;
    this.eventIdToUnregister = id;
  }
  cancelDialog() {
    this.showDialog = false;
    this.isDeleteEventDialog = false;
    this.isUnregisterAllDialog = false;
  }
  navigateProfile(options: string) {
    this.userOptions = options;
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log(file, 'event image');
    const reader = new FileReader();
    // this.eventPictureFileString = file;
    reader.onload = ((event: any) => {
        this.eventPictureFile = new ImageSnippet(event.target.result, file);
        this.eventPictureFile.pending = true;
        // this.isUploadButtonDisabled = false;
      }
    );
    reader.readAsDataURL(file);
  }
  processSpeakerFile(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log(file, 'speaker image');
    const reader = new FileReader();
    // this.eventPictureFileString = file;
    reader.onload = ((event: any) => {
        this.speakerPictureFile = new ImageSnippet(event.target.result, file);
        this.speakerPictureFile.pending = true;
        // this.isUploadButtonDisabled = false;
      }
    );
    reader.readAsDataURL(file);
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
      eventAgenda: '',
      eventMap: '',
      // eventPicture: this.eventPictureFileString.lastModified + '-' + this.eventPictureFileString.name,
      eventPicture: '',
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
    if (e_info['eventDescription'] === '') {
      e_info['eventDescription'] = this.events.events[index].eventDescription;
    }
    const body = {
      eventName: e_info['eventName'],
      eventTopic: e_info['eventTopic'],
      eventOrganizer: e_info['eventOrganizer'],
      eventStartDate: e_info['eventStartDate'],
      eventEndDate: e_info['eventEndDate'],
      eventLocation: e_info['eventLocation'],
      eventDescription: e_info['eventDescription'],
    };
    console.log(body);
    this.eventService.updateEvent(JSON.stringify(id), body).then((res) => {
      console.log('sajdba' + id + body);
      if (res['message'] === 'Event updated successfully') {
        this.snackBar.open('Event information successfully updated! Refresh page', 'Done', {
          duration: 5000
        });
      }
      // window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  }
  updateEventPic(id: number) {
    this.eventService.uploadEventPicture(JSON.stringify(id), this.eventPictureFile.file).then((res) => {
      console.log('updating event picture');
      if (res['message'] === 'Event Picture updated successfully') {
        this.snackBar.open('Event picture successfully updated! Refresh page', 'Done', {
          duration: 5000
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  updateSpeakerPic(id: number) {
    this.eventService.uploadSpeakerPicture(JSON.stringify(id), this.speakerPictureFile.file).then((res) => {
      console.log('updating speaker picture');
      if (res['message'] === 'Speaker Picture updated successfully') {
        this.snackBar.open('Speaker picture successfully updated! Refresh page', 'Done', {
          duration: 5000
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  updateEventMap(id: number) {
    const e_info = this.eventMapForm.value;
    const body = {
      eventMap: e_info['eventMap']
    };
    this.eventService.updateEventMap(JSON.stringify(id), body).then((res) => {
      console.log('event map updated' + id + body);
      if (res['message'] === 'Event map updated successfully') {
        this.snackBar.open('Event map successfully updated! Refresh page', 'Done', {
          duration: 5000
        });
      }
      // window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  }
  updateEventAgenda(id: number) {
    const e_info = this.eventAgendaForm.value;
    const body = {
      eventAgenda: e_info['eventAgenda']
    };
    this.eventService.updateEventAgenda(JSON.stringify(id), body).then((res) => {
      console.log('event agenda updated' + id + body);
      if (res['message'] === 'Event agenda updated successfully') {
        this.snackBar.open('Event agenda successfully updated! Refresh page', 'Done', {
          duration: 5000
        });
      }
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
      speakerBio: s_info['speakerBio'],
      speakerSlides: s_info['speakerSlides']
    };
    this.eventService.updateSpeaker(JSON.stringify(id), body).then((res) => {
      if (res['message'] === 'Speaker updated successfully') {
        this.snackBar.open('Speaker successfully updated! Refresh page', 'Done', {
          duration: 5000
        });
      }    }).catch((err) => {
      console.log(err);
    });
  }
  deleteEvent() {
    this.eventService.removeEvent(JSON.stringify(this.eventIdToDelete)).then((res) => {
      // window.location.reload();
      console.log(res);
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
  unregisterAll() {
    const body = '';
    this.eventService.unregisterAllUsers(JSON.stringify(this.eventIdToUnregister)).then((res) => {
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
    this.profileService.getAllAttendees(this.eventId).then(res => {
      this.attendees = res;
      // this.profile.firstName = this.attendees.map(attendee => attendee.firstName);
      this.count = Object.keys(this.attendees).length;
      // @ts-ignore
      this.attendeeCount = Array(this.count).fill().map((x, i) => i);
        // this.isLoading = false;
    }).catch((err) => {
      // this.isLoading = false;
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
    this.eventMapForm = this.fb.group({
      eventMap: ['', [Validators.required]]
    });
    this.eventAgendaForm = this.fb.group({
      eventAgenda: ['', [Validators.required]]
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
