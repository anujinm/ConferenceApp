//export class for Events

export interface EventModel {
  // eventId: number;
  eventName: string;
  eventTopic: string;
  eventOrganizer: string;
  eventStartDate: string;
  eventEndDate: string;
  eventDescription: string;
  eventAgenda: string;
  eventMap: string;
  eventPicture: string;
  eventLocation: string;
}

export class ImageSnippet {
  pending = false;
  status = 'init';
  constructor(public src: string, public file: File) {

  }
}
