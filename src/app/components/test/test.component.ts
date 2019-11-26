import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {ViewType} from "../../scheduler/enums/view-types";
import {SchedulerData} from "./scheduler-data";
import {resource} from "selenium-webdriver/http";

export type EventGroup = {[key: string]: Array<EventData>};
export class TestData {
  id: number;
  start: string;
  end: string;
  resourceId: string;
  title: string;
  description: string;
  eventGroups: EventGroup;
  duration: number;
  events: EventData[];
  color?: string;
}

class EventData {
  start: string;
  end: string;
  description: string;
  id: number;
  duration: number;
}

@Component({
  selector: 'pl-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  processComplete: boolean;
  schedulerData: SchedulerData;
  processedData: Array<TestData> = [];
  sampleData: Array<TestData> = [
    {
      id: 2,
      start: '2019-12-18 12:30:00',
      end: '2019-12-26 23:30:00',
      resourceId: 'r2',
      title: 'James Bond',
      description: 'James Bond Leave 3(8 days)',
      duration: 8,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 4,
          start: '2019-12-15 12:30:00',
          end: '2019-12-27 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 12
        },
        {
          id: 5,
          start: '2019-12-28 12:30:00',
          end: '2019-12-29 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 8
        },
        {
          id: 6,
          start: '2019-12-13 12:30:00',
          end: '2019-12-19 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 8
        },

        {
          id: 7,
          start: '2019-12-18 12:30:00',
          end: '2019-12-29 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 8
        },
      ]
    },
    {
      id: 3,
      start: '2019-12-19 12:30:00',
      end: '2019-12-24 23:30:00',
      resourceId: 'r3',
      title: 'John Doe',
      description: 'John Doe Leave 2 (5 days)',
      duration: 5,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 1,
          start: '2019-12-15 12:30:00',
          end: '2019-12-27 23:30:00',
          description: 'John Doe Leave 3(8 days)',
          duration: 12
        },
/*        {
          id: 2,
          start: '2019-12-18 12:30:00',
          end: '2019-12-26 23:30:00',
          description: 'John Doe Leave 3(8 days)',
          duration: 8
        },
        {
          id: 3,
          start: '2019-12-22 12:30:00',
          end: '2018-01-01 23:30:00',
          description: 'John Doe Leave 3(8 days)',
          duration: 12
        },
        {
          id: 4,
          start: '2019-11-22 12:30:00',
          end: '2019-12-11 23:30:00',
          description: 'John Doe Test Previous Month',
          duration: 12
        }*/
      ]
    },
/*    {
      id: 4,
      start: '2019-12-19 12:30:00',
      end: '2019-12-24 23:30:00',
      resourceId: 'r3',
      title: 'Kolawole Jones',
      description: 'Kolawole Jones Leave 2 (5 days)',
      duration: 5,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 1,
          start: '2019-12-15 12:30:00',
          end: '2019-12-27 23:30:00',
          description: 'Kolawole Jones Leave 3(8 days)',
          duration: 12
        },
        {
          id: 2,
          start: '2019-12-18 12:30:00',
          end: '2019-12-26 23:30:00',
          description: 'Kolawole Jones Leave 3(8 days)',
          duration: 8
        }
      ]
    },
    {
      id: 2,
      start: '2019-12-18 12:30:00',
      end: '2019-12-26 23:30:00',
      resourceId: 'r2',
      title: 'James Bond',
      description: 'James Bond Leave 3(8 days)',
      duration: 8,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 4,
          start: '2019-12-15 12:30:00',
          end: '2019-12-27 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 12
        }
      ]
    },
    {
      id: 3,
      start: '2019-12-19 12:30:00',
      end: '2019-12-24 23:30:00',
      resourceId: 'r3',
      title: 'John Doe',
      description: 'John Doe Leave 2 (5 days)',
      duration: 5,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 1,
          start: '2019-12-1 12:30:00',
          end: '2019-12-4 23:30:00',
          description: 'John Doe Leave 3(8 days)',
          duration: 12
        },
        {
          id: 2,
          start: '2019-12-7 12:30:00',
          end: '2019-12-8 23:30:00',
          description: 'John Doe Leave 3(8 days)',
          duration: 8
        }
      ]
    },
    {
      id: 4,
      start: '2019-12-19 12:30:00',
      end: '2019-12-24 23:30:00',
      resourceId: 'r3',
      title: 'Kolawole Jones',
      description: 'Kolawole Jones Leave 2 (5 days)',
      duration: 5,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 1,
          start: '2019-12-15 12:30:00',
          end: '2019-12-27 23:30:00',
          description: 'Kolawole Jones Leave 3(8 days)',
          duration: 12
        },
        {
          id: 2,
          start: '2019-12-18 12:30:00',
          end: '2019-12-26 23:30:00',
          description: 'Kolawole Jones Leave 3(8 days)',
          duration: 8
        }
      ]
    },
    {
      id: 4,
      start: '2019-12-19 12:30:00',
      end: '2019-12-24 23:30:00',
      resourceId: 'r3',
      title: 'Kolawole Jones',
      description: 'Kolawole Jones Leave 2 (5 days)',
      duration: 5,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 1,
          start: '2019-12-15 12:30:00',
          end: '2019-12-27 23:30:00',
          description: 'Kolawole Jones Leave 3(8 days)',
          duration: 12
        },
        {
          id: 2,
          start: '2019-12-18 12:30:00',
          end: '2019-12-26 23:30:00',
          description: 'Kolawole Jones Leave 3(8 days)',
          duration: 8
        }
      ]
    },
    {
      id: 2,
      start: '2019-12-18 12:30:00',
      end: '2019-12-26 23:30:00',
      resourceId: 'r2',
      title: 'James Bond',
      description: 'James Bond Leave 3(8 days)',
      duration: 8,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 4,
          start: '2019-12-15 12:30:00',
          end: '2019-12-27 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 12
        }
      ]
    },
    {
      id: 3,
      start: '2019-12-19 12:30:00',
      end: '2019-12-24 23:30:00',
      resourceId: 'r3',
      title: 'John Doe',
      description: 'John Doe Leave 2 (5 days)',
      duration: 5,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 1,
          start: '2019-12-1 12:30:00',
          end: '2019-12-4 23:30:00',
          description: 'John Doe Leave 3(8 days)',
          duration: 12
        },
        {
          id: 2,
          start: '2019-12-7 12:30:00',
          end: '2019-12-8 23:30:00',
          description: 'John Doe Leave 3(8 days)',
          duration: 8
        }
      ]
    },
    {
      id: 2,
      start: '2019-12-18 12:30:00',
      end: '2019-12-26 23:30:00',
      resourceId: 'r2',
      title: 'James Bond',
      description: 'James Bond Leave 3(8 days)',
      duration: 8,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 4,
          start: '2019-12-15 12:30:00',
          end: '2019-12-27 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 12
        }
      ]
    },
    {
      id: 3,
      start: '2019-12-19 12:30:00',
      end: '2019-12-24 23:30:00',
      resourceId: 'r3',
      title: 'John Doe',
      description: 'John Doe Leave 2 (5 days)',
      duration: 5,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 1,
          start: '2019-12-1 12:30:00',
          end: '2019-12-4 23:30:00',
          description: 'John Doe Leave 3(8 days)',
          duration: 12
        },
        {
          id: 2,
          start: '2019-12-7 12:30:00',
          end: '2019-12-8 23:30:00',
          description: 'John Doe Leave 3(8 days)',
          duration: 8
        }
      ]
    },
    {
      id: 4,
      start: '2019-12-19 12:30:00',
      end: '2019-12-24 23:30:00',
      resourceId: 'r3',
      title: 'Kolawole Jones',
      description: 'Kolawole Jones Leave 2 (5 days)',
      duration: 5,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 1,
          start: '2019-12-15 12:30:00',
          end: '2019-12-27 23:30:00',
          description: 'Kolawole Jones Leave 3(8 days)',
          duration: 12
        },
        {
          id: 2,
          start: '2019-12-18 12:30:00',
          end: '2019-12-26 23:30:00',
          description: 'Kolawole Jones Leave 3(8 days)',
          duration: 8
        }
      ]
    },
    {
      id: 4,
      start: '2019-12-19 12:30:00',
      end: '2019-12-24 23:30:00',
      resourceId: 'r3',
      title: 'Kolawole Jones',
      description: 'Kolawole Jones Leave 2 (5 days)',
      duration: 5,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 1,
          start: '2019-12-15 12:30:00',
          end: '2019-12-27 23:30:00',
          description: 'Kolawole Jones Leave 3(8 days)',
          duration: 12
        },
        {
          id: 2,
          start: '2019-12-18 12:30:00',
          end: '2019-12-26 23:30:00',
          description: 'Kolawole Jones Leave 3(8 days)',
          duration: 8
        }
      ]
    },
    {
      id: 3,
      start: '2019-12-19 12:30:00',
      end: '2019-12-24 23:30:00',
      resourceId: 'r3',
      title: 'John Doe',
      description: 'John Doe Leave 2 (5 days)',
      duration: 5,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 1,
          start: '2019-12-1 12:30:00',
          end: '2019-12-4 23:30:00',
          description: 'John Doe Leave 3(8 days)',
          duration: 12
        },
        {
          id: 2,
          start: '2019-12-7 12:30:00',
          end: '2019-12-8 23:30:00',
          description: 'John Doe Leave 3(8 days)',
          duration: 8
        }
      ]
    },
    {
      id: 2,
      start: '2019-12-18 12:30:00',
      end: '2019-12-26 23:30:00',
      resourceId: 'r2',
      title: 'James Bond',
      description: 'James Bond Leave 3(8 days)',
      duration: 8,
      eventGroups: {},
      color: null,
      events: [
        {
          id: 4,
          start: '2019-12-15 12:30:00',
          end: '2019-12-27 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 12
        }
      ]
    },*/
  ];
  useRandomColor = true;
  colors: any = {
    0: ['#19887A','#FF8E39','#00EB7E'],
    1: ['#1F7A00','#6BAB55','#9c1717'],
    2: ['#cc6125','#402F84','#842047']
  }
  constructor() {
  }

  getRandomColor(eventGroupIndex) {
    const mod = Number(eventGroupIndex) % 3;
    const index = Math.floor(Math.random() * 3);
    return this.colors[mod][index];
  }

  ngOnInit() {
    this.schedulerData = new SchedulerData('2019-12-18', ViewType.MONTH)
      .setStartDate('2019-01-01').setEndDate('2019-12-31');
    // const schedulerData: SchedulerData = new SchedulerData('2019-12-18', ViewType.MONTH);
    // schedulerData.startDate
    // schedulerData.endDate =
    this.schedulerData._createHeaders();
    console.log(this.schedulerData.headers);

    // this.orderResourceEvents(this.sampleData);
    if(!this.processedData.length) {
      this.processedData = this.processEvents(this.sampleData);
    }
  }

  onDateSelected(event) {
    console.log('Value', event.target);
  }


  getMapNextIndex(map: Map<number, Array<any>>,  currentKey: number){
    if(currentKey +1 > map.size) {
      return
    }
    return (map.size);
  }

  processEvents(resourceEventData: Array<TestData>) {
    const d = resourceEventData;
    console.log('d', d);
    d.forEach((resource: TestData, resourceIndex: number) => {
      resource.color = this.useRandomColor ? this.getRandomColor(resourceIndex) : '#FF8E39';
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

  mapHasNext(map: Map<number, Array<any>>, currentKey: number): boolean {
    return ((currentKey + 1) < map.size);
  }

  hasConflict(eventData1: EventData, eventData2: EventData): boolean {
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

  isSame(eventData1: EventData, eventData2: EventData): boolean {
    const e1Start = moment(eventData1.start);
    const e1End = moment(eventData1.end);
    const e2Start = moment(eventData2.start);
    const e2End = moment(eventData2.end);

    // return ((e1Start == e2Start) && (e1End == e2End));
    return (eventData1.start == eventData2.start) && (eventData1.end == eventData2.end)
  }


  getResourceHeight(data: TestData): number {
    return Object.keys(data.eventGroups).length * 30;
  }

  getEventItemWidth(startDate, endDate) {
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


  getEventItemPosition(dateValue) : number{
    const calendarStart = moment(this.schedulerData.startDate);
    const date = moment(dateValue);
    const noOfdays: number = date.diff(calendarStart, 'days');
    return (noOfdays && (noOfdays > 0 ))? noOfdays * 100 : 0;
  }

  getEventGroupKeys(data: TestData): Array<string> {
    return data.eventGroups ? Object.keys(data.eventGroups) : [];
  }

  getEventGroupData(eventGroupKey: string, data: TestData){
    return data.eventGroups[eventGroupKey];
  }

  getLastKey(object: Object): number {
    const keys = Object.keys(object);
    const result = keys.length ? parseInt(keys.reverse()[0]): 0;
    return result;
  }

}
