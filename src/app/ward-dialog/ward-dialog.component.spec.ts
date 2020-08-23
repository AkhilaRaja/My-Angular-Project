import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardDialogComponent } from './ward-dialog.component';

describe('WardDialogComponent', () => {
  let component: WardDialogComponent;
  let fixture: ComponentFixture<WardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
