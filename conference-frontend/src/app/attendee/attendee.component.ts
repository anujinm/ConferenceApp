import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.scss']
})
export class AttendeeComponent implements OnInit {
  attendeeCount = ['Attendee #1', 'Attendee #2', 'Attendee #3', 'Attendee #4', 'Attendee #5'];
  constructor() { }

  ngOnInit() {
  }

}
