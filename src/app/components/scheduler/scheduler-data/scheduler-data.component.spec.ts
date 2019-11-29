import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerDataComponent } from './scheduler-data.component';

describe('SchedulerDataComponent', () => {
  let component: SchedulerDataComponent;
  let fixture: ComponentFixture<SchedulerDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
