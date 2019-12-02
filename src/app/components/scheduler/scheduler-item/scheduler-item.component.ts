import {Component, Input, OnInit} from '@angular/core';
import {TestData} from "../../test/test.component";
import * as moment from "moment";
import {EventData, ResourceData} from "../models/resource-data.model";

@Component({
  selector: 'pl-scheduler-item',
  templateUrl: './scheduler-item.component.html',
  styleUrls: ['./scheduler-item.component.scss']
})
export class SchedulerItemComponent implements OnInit {

  @Input() eventData: EventData;
  @Input() calenderEnd: string | number;
  @Input() calenderStart: string | number;
  constructor() { }

  ngOnInit() {
  }


  getResourceHeight(data: TestData): number {
    return Object.keys(data.eventGroups).length * 30;
  }

  getEventItemWidth(startDate, endDate) {
    const calendarStart = moment(this.calenderStart);
    const calendarEnd = moment(this.calenderEnd);
    const start = moment(startDate);
    const end = moment(endDate);
    const noOfdays: number = end.diff(start, 'days');
    let startDiff = 0;
    let endDiff = 0;

    if(start.isBefore(calendarStart)){
      startDiff = start.diff(calendarStart, 'days');
      console.log('statDif', startDiff);
    }

    if(end.isAfter(calendarEnd)) {
      endDiff = end.diff(calendarEnd, 'days');
      console.log('endDIf', endDiff);
    }

    return noOfdays ? ((noOfdays - (Math.abs(startDiff) + Math.abs(endDiff))) * 100) + 100 - 10: 'auto';
  }

  getEventItemPosition(dateValue) : number{
    const calendarStart = moment(this.calenderStart);
    const date = moment(dateValue);
    const noOfdays: number = date.diff(calendarStart, 'days');
    return (noOfdays && (noOfdays > 0 ))? noOfdays * 100 : 0;
  }


  protected isValidDate(date){
    return moment(date).isSameOrAfter(this.calenderStart);
  }

  showTooltip(event, elementRef) {
    const container = event.target.getBoundingClientRect();
    const x = event.clientX - container.left - 120;
    elementRef.setAttribute('style', `left: ${x}px`);
  }
}
