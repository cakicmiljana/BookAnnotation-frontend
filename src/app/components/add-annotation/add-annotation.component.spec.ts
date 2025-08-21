import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnotationComponent } from './add-annotation.component';

describe('AddAnnotationComponent', () => {
  let component: AddAnnotationComponent;
  let fixture: ComponentFixture<AddAnnotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAnnotationComponent]
    });
    fixture = TestBed.createComponent(AddAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
