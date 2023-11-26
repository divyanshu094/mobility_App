import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizerPage } from './organizer.page';

describe('OrganizerPage', () => {
  let component: OrganizerPage;
  let fixture: ComponentFixture<OrganizerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrganizerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
