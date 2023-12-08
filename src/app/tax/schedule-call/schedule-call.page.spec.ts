import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleCallPage } from './schedule-call.page';

describe('ScheduleCallPage', () => {
  let component: ScheduleCallPage;
  let fixture: ComponentFixture<ScheduleCallPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScheduleCallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
