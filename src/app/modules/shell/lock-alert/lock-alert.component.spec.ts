import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockAlertComponent } from './lock-alert.component';

describe('LockAlertComponent', () => {
  let component: LockAlertComponent;
  let fixture: ComponentFixture<LockAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
