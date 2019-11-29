import {EventStatus} from "../enums/event-status";
/**
 * Created by alao on 11/29/2019.
 */

export class EventData {
  id: number;
  description: string;
  start: string;
  end: string;
  status?: EventStatus;
}
export type EventGroup = {[key: string]: Array<EventData>};

interface IResourceData {
  id: number;
  title: string;
  description: string;
  resourceId: string;
  eventGroups: EventGroup;
  events: EventData[];
  color?: string;
  data?: any;
}

export class ResourceData implements IResourceData{
  id: number;
  title: string;
  description: string;
  resourceId: string;
  eventGroups: EventGroup;
  events: EventData[];
  color?: string;
  data?: any;


  constructor(data?: Partial<IResourceData>) {
    this.id = data.id || null;
    this.title = data.title || '';
    this.description = data.description || '';
    this.resourceId = data.resourceId || null;
    this.eventGroups = data.eventGroups || {};
    this.events = data.events || [];
    this.color = data.color || '';
    this.data = data.data || {};
  }

}
