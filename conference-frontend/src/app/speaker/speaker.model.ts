// import {BadgeModel} from '../badges/badges.model';

export interface SpeakerModel {
  // id: number;
  eventId: number;
  speakerName: string;
  speakerTopic: string;
  speakerPicture: string;
  speakerAdditionalPicture: string;
  speakerBio: string;
  speakerSlides: string;
}

export class ImageSnippet {
  pending = false;
  status = 'init';
  constructor(public src: string, public file: File) {

  }
}
