import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProductComponent } from './business-product.component';

describe('BusinessProductComponent', () => {
  let component: BusinessProductComponent;
  let fixture: ComponentFixture<BusinessProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessProductComponent]
    });
    fixture = TestBed.createComponent(BusinessProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
