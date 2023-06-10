import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvoyageComponent } from './editvoyage.component';

describe('EditvoyageComponent', () => {
  let component: EditvoyageComponent;
  let fixture: ComponentFixture<EditvoyageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditvoyageComponent]
    });
    fixture = TestBed.createComponent(EditvoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
