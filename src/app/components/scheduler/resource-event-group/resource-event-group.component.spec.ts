import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceEventGroupComponent } from './resource-event-group.component';

describe('ResourceEventGroupComponent', () => {
  let component: ResourceEventGroupComponent;
  let fixture: ComponentFixture<ResourceEventGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceEventGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceEventGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
