import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelCalPage } from './travel-cal.page';

describe('TravelCalPage', () => {
  let component: TravelCalPage;
  let fixture: ComponentFixture<TravelCalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TravelCalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
