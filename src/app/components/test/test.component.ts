import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

export class TestData {
  id: number;
  start: string;
  end: string;
  resourceId: string;
  title: string;
  description: string;
  duration: number;
  events: EventData[];
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


  sampleData:Array<TestData> = [
    {
      id: 2,
      start: '2017-12-18 12:30:00',
      end: '2017-12-26 23:30:00',
      resourceId: 'r2',
      title: 'James Bond',
      description: 'James Bond Leave 3(8 days)',
      duration: 8,
      events: [
        {
          id: 4,
          start: '2017-12-15 12:30:00',
          end: '2017-12-27 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 12
        },
        {
          id: 5,
          start: '2017-12-18 12:30:00',
          end: '2017-12-29 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 8
        },
        {
          id: 6,
          start: '2017-12-13 12:30:00',
          end: '2017-12-19 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 8
        }
      ]
    }/*,
    {
      id: 3,
      start: '2017-12-19 12:30:00',
      end: '2017-12-24 23:30:00',
      resourceId: 'r3',
      title: 'John Doe',
      description: 'John Doe Leave 2 (5 days)',
      duration: 5,
      events: [
        {
          id: 1,
          start: '2017-12-15 12:30:00',
          end: '2017-12-27 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 12
        },
        {
          id: 2,
          start: '2017-12-18 12:30:00',
          end: '2017-12-26 23:30:00',
          description: 'James Bond Leave 3(8 days)',
          duration: 8
        }
      ]
    }*/
    ]
  constructor() { }

  ngOnInit() {

    // this.orderResourceEvents(this.sampleData);
    this.processEvents(this.sampleData);
  }

  onDateSelected(event){
    console.log('Value', event.target);
  }

  processEvents(resourceEventData: Array<TestData>) {
    resourceEventData.forEach((resource: TestData) => {
      let mapData: Map<number, Array<any>> = new Map<number, Array<any>>();
      resource.events.sort((a, b) => (a.start > b.start) ? 1 : -1);
      resource.events.forEach((event: EventData, index) => {
        debugger;
        const arr = [];
        if(index == 0) {
          arr.push(event);
          mapData.set(index, arr);
        } else {
          for (let i = 0; i < mapData.size; i++) {
            const groupData = mapData.get(i);
            const groupKey = i;
            const hasConflict = groupData.findIndex(obj => this.hasConflict(event,obj)) > -1;
            const hasEvent = groupData.findIndex(obj => this.isSame(event,obj)) > -1;

            if(hasConflict && !hasEvent) {
              if(!this.mapHasNext(mapData, groupKey)) {
                arr.push(event);
                mapData.set(index, arr);
                break;
              }
            } else if(!hasConflict){
              groupData.push(event);
              break;
            }
          }
        }
      });
      console.log('Group maps', mapData);
    });
  }

  mapHasNext(map: Map<number, Array<any>>, currentKey: number): boolean {
    return ((currentKey +1) < map.size);
  }

  hasConflict(eventData1: EventData, eventData2: EventData): boolean {
    const e1Start = moment(eventData1.start);
    const e1End = moment(eventData1.end);
    const e2Start = moment(eventData2.start);
    const e2End = moment(eventData2.end);

    if((e1Start >= e2Start && e1Start < e2End)
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

}

