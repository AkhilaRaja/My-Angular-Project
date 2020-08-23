import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingstationDialogComponent } from './pollingstation-dialog.component';

describe('PollingstationDialogComponent', () => {
  let component: PollingstationDialogComponent;
  let fixture: ComponentFixture<PollingstationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollingstationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingstationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
