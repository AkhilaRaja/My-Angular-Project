import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionDialogComponent } from './religion-dialog.component';

describe('ReligionDialogComponent', () => {
  let component: ReligionDialogComponent;
  let fixture: ComponentFixture<ReligionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
