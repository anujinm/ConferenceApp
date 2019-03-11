import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SlideModel } from './slide.model';
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {
  imageUrls: (string | SlideModel)[] = [
    {
      url: 'assets/images/attendees.jpg',
      caption: 'The first slide',
      clickAction: () => this.router.navigate(['product'])
    },
    {
      url: 'assets/images/slideshow3.jpg',
      caption: 'The second slide',
      clickAction: () => this.router.navigate(['product'])
    },
    {
      url: 'assets/images/slideshow4.jpg',
      caption: 'The third slide',
      clickAction: () => this.router.navigate(['product'])
    }
  ];
  divWidth: number;
  height: string;
  minHeight = '200px';
  arrowSize = '30px';
  showArrows = true;
  disableSwiping = false;
  autoPlay = true;
  autoPlayInterval = 3333;
  stopAutoPlayOnSlide = true;
  debug = false;
  backgroundSize = 'cover';
  backgroundPosition = 'center center';
  backgroundRepeat = 'no-repeat';
  showDots = true;
  dotColor = '#FFF';
  showCaptions = true;
  captionColor = '#FFF';
  captionBackground = 'rgba(0, 0, 0, .35)';
  lazyLoad = false;
  hideOnNoSlides = false;
  constructor( private router: Router
  ) { }

  ngOnInit() {
    this.onResize();
  }
  onResize() {
    this.divWidth = window.innerWidth;
    if (this.divWidth > 960) {
      this.height = '400px';
    } else {
      this.height = '200px';

    }
  }
}
