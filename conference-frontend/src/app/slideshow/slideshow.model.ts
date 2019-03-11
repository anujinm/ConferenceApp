class SlideshowModel {
  name: string;
  subCategories: SubSlideshowModel[];

}

class SubSlideshowModel {
  name: string;
  cid: string;
  subSubCategories: SubSubSlideshowModel[];
}

class SubSubSlideshowModel {
  name: string;
  cid: string;
}

