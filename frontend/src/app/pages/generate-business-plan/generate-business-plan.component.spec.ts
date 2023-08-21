import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBusinessPlanComponent } from './generate-business-plan.component';

describe('GenerateBusinessPlanComponent', () => {
  let component: GenerateBusinessPlanComponent;
  let fixture: ComponentFixture<GenerateBusinessPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateBusinessPlanComponent]
    });
    fixture = TestBed.createComponent(GenerateBusinessPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
