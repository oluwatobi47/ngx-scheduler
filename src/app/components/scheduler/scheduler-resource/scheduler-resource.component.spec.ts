import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerResourceComponent } from './scheduler-resource.component';

describe('SchedulerResourceComponent', () => {
  let component: SchedulerResourceComponent;
  let fixture: ComponentFixture<SchedulerResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
