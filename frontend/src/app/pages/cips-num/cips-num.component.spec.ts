import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CipsNumComponent } from './cips-num.component';

describe('CipsNumComponent', () => {
  let component: CipsNumComponent;
  let fixture: ComponentFixture<CipsNumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CipsNumComponent]
    });
    fixture = TestBed.createComponent(CipsNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
