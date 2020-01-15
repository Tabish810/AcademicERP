import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssignHostelComponent } from './manage-assign-hostel.component';

describe('ManageAssignHostelComponent', () => {
  let component: ManageAssignHostelComponent;
  let fixture: ComponentFixture<ManageAssignHostelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAssignHostelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAssignHostelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
