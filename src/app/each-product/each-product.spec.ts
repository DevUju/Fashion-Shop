import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachProduct } from './each-product';

describe('EachProduct', () => {
  let component: EachProduct;
  let fixture: ComponentFixture<EachProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EachProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EachProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
