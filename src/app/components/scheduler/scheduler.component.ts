import {Component, ContentChild, Input, OnInit} from '@angular/core';
import {ViewType} from "./enums/view-types";
import {SchedulerData} from "./models/scheduler-data.model";
import {EventData, ResourceData} from "./models/resource-data.model";
import * as moment from 'moment';
import * as $ from 'jquery';
import {SchedulerDataComponent} from "./scheduler-data/scheduler-data.component";

@Component({
  selector: 'pl-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  @ContentChild(SchedulerDataComponent, {static: false})
  schedulerTooltipComponent: SchedulerDataComponent;

  @Input() resourceData: ResourceData[] = [];
  @Input() pResourceData: ResourceData[] = [];
  @Input() calenderEnd: string | number;
  @Input() calenderStart: string | number;

  @Input() resourceHeader: string = 'Resource Name'

  @Input() viewType?: ViewType = ViewType.MONTH;
  @Input() useRandomColor?: boolean = true;
  @Input() colors?: any = {
    0: ['#19887A','#FF8E39','#00EB7E'],
    1: ['#1F7A00','#6BAB55','#9c1717'],
    2: ['#cc6125','#402F84','#842047']
  };
  @Input() defaultItemColor?: string = '#595959';//'#FF8E39'
  @Input() weekendColor?: string = '#eaeaea'; //'#45966920'

  schedulerData: SchedulerData;


  constructor() { }

  ngOnInit() {
    if(this.resourceData) {
      this.loadScheduler();
    }
  }

  initScheduler(){
    this.schedulerData = new SchedulerData(this.calenderStart || this.currentDateString, this.viewType)
      .setStartDate(this.calenderStart).setEndDate(this.calenderEnd);
    this.schedulerData._createHeaders();
  }

  loadScheduler(){
    this.initScheduler();
    this.pResourceData = this.resourceData.length ? this.processResourceData(this.resourceData) : [];
  }

  get currentDateString() {
    const date = new Date();
    const dateString = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    return dateString;
  }


  processResourceData(resourceEventData: Array<ResourceData>) {
    const d = resourceEventData;
    console.log('d', d);
    d.forEach((resource: ResourceData, resourceIndex: number) => {
      resource.color = this.useRandomColor ? this.getRandomColor(resourceIndex) : this.defaultItemColor;
      let mapData: Map<number, Array<any>> = new Map<number, Array<any>>();
      let mapObj: any = {};
      resource.events.sort((a, b) => (a.start > b.start) ? 1 : -1);
      resource.events.forEach((event: EventData, index) => {
        // debugger;
        const arr = [];
        if (index == 0) {
          arr.push(event);
          mapData.set(index, arr);
          resource.eventGroups[index] = arr;
        } else {
          for (let i = 0; i < mapData.size; i++) {
            const groupData = mapData.get(i);
            console.log(i);
            const groupKey = i;
            const hasConflict = groupData.findIndex(obj => this.hasConflict(event, obj)) > -1;
            const hasEvent = groupData.findIndex(obj => this.isSame(event, obj)) > -1;

            if (hasConflict && !hasEvent) {
              if (!this.mapHasNext(mapData, groupKey)) {
                arr.push(event);
                console.log('Curr Key', this.getLastKey(resource.eventGroups));
                mapData.set((this.getLastKey(resource.eventGroups)+1), arr);
                resource.eventGroups[this.getLastKey(resource.eventGroups)+1] = arr;
                break;
              }
            } else if (!hasConflict) {
              groupData.push(event);
              break;
            }
          }
        }
      });
      console.log('Group maps', mapData, resource);
    });
    return d;
  }

  private mapHasNext(map: Map<number, Array<any>>, currentKey: number): boolean {
    return ((currentKey + 1) < map.size);
  }

  private hasConflict(eventData1: EventData, eventData2: EventData): boolean {
    const e1Start = moment(eventData1.start);
    const e1End = moment(eventData1.end);
    const e2Start = moment(eventData2.start);
    const e2End = moment(eventData2.end);

    if ((e1Start >= e2Start && e1Start < e2End)
      || (e1End > e2Start && e1End <= e2End)
      || (e2Start >= e1Start && e2Start < e1End)
      || (e2End > e1Start && e2End <= e1End)) {
      return true;
    }
    return false;
  }

  private isSame(eventData1: EventData, eventData2: EventData): boolean {
    const e1Start = moment(eventData1.start);
    const e1End = moment(eventData1.end);
    const e2Start = moment(eventData2.start);
    const e2End = moment(eventData2.end);

    // return ((e1Start == e2Start) && (e1End == e2End));
    return (eventData1.start == eventData2.start) && (eventData1.end == eventData2.end)
  }

  private getLastKey(object: Object): number {
    const keys = Object.keys(object);
    const result = keys.length ? parseInt(keys.reverse()[0]): 0;
    return result;
  }

  private getRandomColor(eventGroupIndex) {
    const mod = Number(eventGroupIndex) % 3;
    const index = Math.floor(Math.random() * 3);
    return this.colors[mod][index];
  }

  protected getResourceHeight(data: ResourceData): number {
    return Object.keys(data.eventGroups).length * 30;
  }

  protected getEventItemWidth(startDate, endDate) {
    const calendarStart = moment(this.schedulerData.startDate);
    const calendarEnd = moment(this.schedulerData.endDate);
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

  protected getEventItemPosition(dateValue) : number{
    const calendarStart = moment(this.schedulerData.startDate);
    const date = moment(dateValue);
    const noOfdays: number = date.diff(calendarStart, 'days');
    return (noOfdays && (noOfdays > 0 ))? noOfdays * 100 : 0;
  }

  protected getEventGroupKeys(data: ResourceData): Array<string> {
    return data.eventGroups ? Object.keys(data.eventGroups) : [];
  }

  protected getEventGroupData(eventGroupKey: string, data: ResourceData){
    return data.eventGroups[eventGroupKey];
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
