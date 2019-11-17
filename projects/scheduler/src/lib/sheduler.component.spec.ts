import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedulerComponent } from './sheduler.component';

describe('ShedulerComponent', () => {
  let component: ShedulerComponent;
  let fixture: ComponentFixture<ShedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
