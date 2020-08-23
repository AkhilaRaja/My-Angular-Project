import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasteComponent } from './caste.component';

describe('CasteComponent', () => {
  let component: CasteComponent;
  let fixture: ComponentFixture<CasteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
