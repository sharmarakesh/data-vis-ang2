import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AxisData } from './axis-data';
import { DataService } from '../shared/data.service';
import { ChartUtilsService } from '../shared/chart-utils.service';
import { Constants } from '../shared/constant';


@Component({
  selector: 'app-graph-form',
  templateUrl: './graph-form.component.html',
  styleUrls: ['./graph-form.component.css']
})
export class GraphFormComponent implements OnInit {

  @Output()
  graphType: string = Constants.DEFAULT_GRAPH;

  public barFocusTrigger = new EventEmitter<boolean>();
  public lineFocusTrigger = new EventEmitter<boolean>();
  public donutFocusTrigger = new EventEmitter<boolean>();
  public scatterFocusTrigger = new EventEmitter<boolean>();
  public stackFocusTrigger = new EventEmitter<boolean>();


  private axisData: AxisData;
  private toggleChartObj = {
    linechart: this.lineFocusTrigger,
    barchart: this.barFocusTrigger,
    donutchart: this.donutFocusTrigger,
    scatterchart: this.scatterFocusTrigger,
    stackbarchart: this.stackFocusTrigger
  }

  constructor(private dataService: DataService, private chartUtils: ChartUtilsService) {}

  ngOnInit() {
    this.axisData = new AxisData('', '', '');
  }

  private transferDataSuccess(event) {
    const axis = event.mouseEvent.target.name
    this.axisData[`${axis}Column`] = event.dragData;
  }

  private onSubmit(form: NgForm) {
    if (!this.axisData.xColumn || !this.axisData.yColumn) {
      return;
    }
    this.graphType = 'barchart';
    this.dataService.setAxes(this.axisData);
    this.toggleChartBtn();
  }

  private toggleChartBtn() {
    this.toggleChartObj[this.graphType].emit(true)
  }

  private changeGraph(graph) {
    this.graphType = graph;
  }

  private onReset() {
    this.graphType = 'default';
    this.chartUtils.resetSVG();
    this.chartUtils.resetLegend();
    this.dataService.setD3data([]);
  }
}
