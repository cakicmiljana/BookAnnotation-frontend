import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionUploadComponent } from './version-upload.component';

describe('VersionUploadComponent', () => {
  let component: VersionUploadComponent;
  let fixture: ComponentFixture<VersionUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VersionUploadComponent]
    });
    fixture = TestBed.createComponent(VersionUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
