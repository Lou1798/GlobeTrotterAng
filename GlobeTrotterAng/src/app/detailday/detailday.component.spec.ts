import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildayComponent } from './detailday.component';

describe('DetaildayComponent', () => {
  let component: DetaildayComponent;
  let fixture: ComponentFixture<DetaildayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetaildayComponent]
    });
    fixture = TestBed.createComponent(DetaildayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
