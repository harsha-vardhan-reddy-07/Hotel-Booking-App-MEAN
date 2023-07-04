import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHotelSelfComponent } from './edit-hotel-self.component';

describe('EditHotelSelfComponent', () => {
  let component: EditHotelSelfComponent;
  let fixture: ComponentFixture<EditHotelSelfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditHotelSelfComponent]
    });
    fixture = TestBed.createComponent(EditHotelSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
