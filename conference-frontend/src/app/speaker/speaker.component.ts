import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent implements OnInit {
  speakerCount = ['Speaker #1', 'Speaker #2', 'Speaker #3', 'Speaker #4', 'Speaker #5' ];
  constructor() { }

  ngOnInit() {
  }

}
