import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionPreviewComponent } from './version-preview.component';

describe('VersionPreviewComponent', () => {
  let component: VersionPreviewComponent;
  let fixture: ComponentFixture<VersionPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VersionPreviewComponent]
    });
    fixture = TestBed.createComponent(VersionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
