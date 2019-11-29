import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerComponent } from './scheduler.component';
// import { SchedulerItemComponent } from './scheduler-item/scheduler-item.component';
import { SchedulerDataComponent } from './scheduler-data/scheduler-data.component';
import { SchedulerResourceComponent } from './scheduler-resource/scheduler-resource.component';



@NgModule({
  declarations: [SchedulerComponent, SchedulerDataComponent, SchedulerResourceComponent],
  imports: [
    CommonModule
  ], exports: [SchedulerComponent]
})
export class SchedulerModule { }
