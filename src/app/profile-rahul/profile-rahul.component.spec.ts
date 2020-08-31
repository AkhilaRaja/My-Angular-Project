import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRahulComponent } from './profile-rahul.component';

describe('ProfileRahulComponent', () => {
  let component: ProfileRahulComponent;
  let fixture: ComponentFixture<ProfileRahulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRahulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRahulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
