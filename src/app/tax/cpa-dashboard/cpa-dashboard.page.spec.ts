import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CpaDashboardPage } from './cpa-dashboard.page';

describe('CpaDashboardPage', () => {
  let component: CpaDashboardPage;
  let fixture: ComponentFixture<CpaDashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CpaDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
