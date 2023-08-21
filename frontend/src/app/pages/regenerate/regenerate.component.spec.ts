import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegenerateComponent } from './regenerate.component';

describe('RegenerateComponent', () => {
  let component: RegenerateComponent;
  let fixture: ComponentFixture<RegenerateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegenerateComponent]
    });
    fixture = TestBed.createComponent(RegenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
