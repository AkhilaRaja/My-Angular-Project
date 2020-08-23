import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingstationComponent } from './pollingstation.component';

describe('PollingstationComponent', () => {
  let component: PollingstationComponent;
  let fixture: ComponentFixture<PollingstationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollingstationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
