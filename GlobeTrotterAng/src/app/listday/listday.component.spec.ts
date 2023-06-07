import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdayComponent } from './listday.component';

describe('ListdayComponent', () => {
  let component: ListdayComponent;
  let fixture: ComponentFixture<ListdayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListdayComponent]
    });
    fixture = TestBed.createComponent(ListdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
