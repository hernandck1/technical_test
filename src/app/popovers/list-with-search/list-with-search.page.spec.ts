import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListWithSearchPage } from './list-with-search.page';

describe('ListWithSearchPage', () => {
  let component: ListWithSearchPage;
  let fixture: ComponentFixture<ListWithSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWithSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
