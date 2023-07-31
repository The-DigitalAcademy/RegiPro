import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quiz5Component } from './quiz5.component';

describe('Quiz5Component', () => {
  let component: Quiz5Component;
  let fixture: ComponentFixture<Quiz5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Quiz5Component]
    });
    fixture = TestBed.createComponent(Quiz5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
