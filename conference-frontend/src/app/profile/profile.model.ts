// import {BadgeModel} from '../badges/badges.model';

export interface ProfileModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  personalEmail: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  acceptanceStatus: string;
  // address1: string;
  // address2: string;
  // city: string;
  // state: string;
  // zipCode: string;
  phoneNumber: string;
  // birthday: string;
  // schoolYear: string;
  // schoolState: string;
  // schoolCity: string;
  // degreeLevel: string;
  // graduationYear: string;
  // major: string;
  // major2: string;
  // schoolName: string;
  emailVerified: number;
  level: number;
  bio: string;
  profilePic: string;
  // Badges: BadgeModel[];
}

export class ImageSnippet {
  pending = false;
  status = 'init';
  constructor(public src: string, public file: File) {

  }
}
