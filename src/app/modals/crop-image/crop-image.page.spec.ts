import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CropImagePage } from './crop-image.page';

describe('CropImagePage', () => {
  let component: CropImagePage;
  let fixture: ComponentFixture<CropImagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CropImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
