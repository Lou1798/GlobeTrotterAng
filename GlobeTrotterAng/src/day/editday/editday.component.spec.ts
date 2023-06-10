import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdayComponent } from './editday.component';

describe('EditdayComponent', () => {
  let component: EditdayComponent;
  let fixture: ComponentFixture<EditdayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditdayComponent]
    });
    fixture = TestBed.createComponent(EditdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
