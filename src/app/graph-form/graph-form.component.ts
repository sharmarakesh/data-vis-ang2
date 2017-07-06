import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AxisData } from './axis-data';
import { DataService } from '../data.service';


@Component({
  selector: 'app-graph-form',
  templateUrl: './graph-form.component.html',
  styleUrls: ['./graph-form.component.css']
})
export class GraphFormComponent implements OnInit {

  axisData: AxisData;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.axisData = new AxisData('', '');
  }

  transferDataSuccess(event) {
    const axis = event.mouseEvent.target.name
    this.axisData[`${axis}Column`] = event.dragData;
  }

  onSubmit(form) {
    this.dataService.setAxes(this.axisData);
    // TODO Finish this.
  }
}
