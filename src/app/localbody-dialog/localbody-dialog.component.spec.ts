import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalbodyDialogComponent } from './localbody-dialog.component';

describe('LocalbodyDialogComponent', () => {
  let component: LocalbodyDialogComponent;
  let fixture: ComponentFixture<LocalbodyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalbodyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalbodyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
