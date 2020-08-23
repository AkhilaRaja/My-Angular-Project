import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterDialogComponent } from './voter-dialog.component';

describe('VoterDialogComponent', () => {
  let component: VoterDialogComponent;
  let fixture: ComponentFixture<VoterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
