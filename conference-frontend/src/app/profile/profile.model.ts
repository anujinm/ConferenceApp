// import {BadgeModel} from '../badges/badges.model';

export interface ProfileModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  social1: string;
  social2: string;
  social3: string;
  schoolDistrict: string;
  roleAtDistrict: string;
  level: number;
  bio: string;
  profilePic: string;
}

export class ImageSnippet {
  pending = false;
  status = 'init';
  constructor(public src: string, public file: File) {

  }
}
