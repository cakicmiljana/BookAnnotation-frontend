import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionListComponent } from './version-list.component';

describe('VersionListComponent', () => {
  let component: VersionListComponent;
  let fixture: ComponentFixture<VersionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VersionListComponent]
    });
    fixture = TestBed.createComponent(VersionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
