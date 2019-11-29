import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ResourceData} from "../models/resource-data.model";

@Component({
  selector: 'pl-scheduler-resource',
  templateUrl: './scheduler-resource.component.html',
  styleUrls: ['./scheduler-resource.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulerResourceComponent implements OnInit {

  @Input()
  resource: ResourceData;

  constructor() { }

  ngOnInit() {
  }

  protected getResourceHeight(data: ResourceData): number {
    return Object.keys(data.eventGroups).length * 30;
  }

}
