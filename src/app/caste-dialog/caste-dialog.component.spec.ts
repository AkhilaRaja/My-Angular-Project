import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasteDialogComponent } from './caste-dialog.component';

describe('CasteDialogComponent', () => {
  let component: CasteDialogComponent;
  let fixture: ComponentFixture<CasteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
