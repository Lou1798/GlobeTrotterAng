import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdayComponent } from './newday.component';

describe('NewdayComponent', () => {
  let component: NewdayComponent;
  let fixture: ComponentFixture<NewdayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewdayComponent]
    });
    fixture = TestBed.createComponent(NewdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
