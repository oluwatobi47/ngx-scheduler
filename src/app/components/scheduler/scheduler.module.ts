import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerComponent } from './scheduler.component';
// import { SchedulerItemComponent } from './scheduler-item/scheduler-item.component';
import { SchedulerDataComponent } from './scheduler-data/scheduler-data.component';
import { SchedulerResourceComponent } from './scheduler-resource/scheduler-resource.component';
import { SchedulerItemComponent } from './scheduler-item/scheduler-item.component';
import { ResourceEventGroupComponent } from './resource-event-group/resource-event-group.component';



@NgModule({
  declarations: [SchedulerComponent, SchedulerDataComponent, SchedulerResourceComponent, SchedulerItemComponent, ResourceEventGroupComponent],
  imports: [
    CommonModule
  ], exports: [SchedulerComponent, SchedulerDataComponent, SchedulerResourceComponent, SchedulerItemComponent, ResourceEventGroupComponent]
})
export class SchedulerModule { }
