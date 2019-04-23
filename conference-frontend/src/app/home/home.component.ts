import { Component, OnInit } from '@angular/core';
import { EventModel } from './event.model';
import { HomeService } from './event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events;
  eventMap;

  constructor(
  private eventService: HomeService) { }

  ngOnInit() {
    console.log("we here1");

    this.eventService.getEventMap('3').then((res) => {
      this.events = res;
      console.log("we here2");
      console.log(this.events);
      console.log("we here3");
      this.eventMap = this.events.event[3].eventMap;

    }).catch ((err) => {
      console.log(err);
    });
  }
}
