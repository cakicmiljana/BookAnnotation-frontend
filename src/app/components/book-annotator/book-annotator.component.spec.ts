import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAnnotatorComponent } from './book-annotator.component';

describe('BookAnnotatorComponent', () => {
  let component: BookAnnotatorComponent;
  let fixture: ComponentFixture<BookAnnotatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookAnnotatorComponent]
    });
    fixture = TestBed.createComponent(BookAnnotatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
