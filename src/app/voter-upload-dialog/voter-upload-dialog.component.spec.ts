import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterUploadDialogComponent } from './voter-upload-dialog.component';

describe('VoterUploadDialogComponent', () => {
  let component: VoterUploadDialogComponent;
  let fixture: ComponentFixture<VoterUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
