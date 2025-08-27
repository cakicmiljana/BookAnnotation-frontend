import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnnotationComponent } from './update-annotation.component';

describe('UpdateAnnotationComponent', () => {
  let component: UpdateAnnotationComponent;
  let fixture: ComponentFixture<UpdateAnnotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAnnotationComponent]
    });
    fixture = TestBed.createComponent(UpdateAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
