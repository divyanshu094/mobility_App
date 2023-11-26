import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EngLetterPage } from './eng-letter.page';

describe('EngLetterPage', () => {
  let component: EngLetterPage;
  let fixture: ComponentFixture<EngLetterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EngLetterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
