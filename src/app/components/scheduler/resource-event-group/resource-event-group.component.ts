import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {EventData} from "../models/resource-data.model";

@Component({
  selector: 'pl-resource-event-group',
  templateUrl: './resource-event-group.component.html',
  styleUrls: ['./resource-event-group.component.scss']
})
export class ResourceEventGroupComponent implements OnInit {


  @Input() groupData?: EventData[];
  constructor() { }

  ngOnInit() {
  }

  hasValidEvents(){

  }

}
