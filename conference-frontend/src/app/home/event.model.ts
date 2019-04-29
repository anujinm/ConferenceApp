// import {BadgeModel} from '../badges/badges.model';

export interface EventModel {
  id: number;
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
  createdAt: string;
  updatedAt: string;
}

export class ImageSnippet {
  pending = false;
  status = 'init';
  constructor(public src: string, public file: File) {

  }
}
