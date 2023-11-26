import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReturnStatusPage } from './return-status.page';

describe('ReturnStatusPage', () => {
  let component: ReturnStatusPage;
  let fixture: ComponentFixture<ReturnStatusPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReturnStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
