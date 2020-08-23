import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalbodyComponent } from './localbody.component';

describe('LocalbodyComponent', () => {
  let component: LocalbodyComponent;
  let fixture: ComponentFixture<LocalbodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalbodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
