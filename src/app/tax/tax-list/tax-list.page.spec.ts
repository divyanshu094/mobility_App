import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxListPage } from './tax-list.page';

describe('TaxListPage', () => {
  let component: TaxListPage;
  let fixture: ComponentFixture<TaxListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TaxListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
