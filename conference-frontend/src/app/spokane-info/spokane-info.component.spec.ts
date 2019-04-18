import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpokaneInfoComponent } from './spokane-info.component';

describe('SpokaneInfoComponent', () => {
  let component: SpokaneInfoComponent;
  let fixture: ComponentFixture<SpokaneInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpokaneInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpokaneInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
