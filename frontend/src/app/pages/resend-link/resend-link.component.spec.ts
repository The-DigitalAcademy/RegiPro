import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendLinkComponent } from './resend-link.component';

describe('ResendLinkComponent', () => {
  let component: ResendLinkComponent;
  let fixture: ComponentFixture<ResendLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResendLinkComponent]
    });
    fixture = TestBed.createComponent(ResendLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
