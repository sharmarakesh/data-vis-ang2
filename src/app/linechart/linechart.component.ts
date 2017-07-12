import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { ChartUtilsService } from '../chart-utils.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
  @ViewChild('linechart') private lineContainer: ElementRef;
  private data;
  private xAxis;
  private yAxis;
  private margin = {top: 50, right: 20, bottom: 100, left: 45};
  private width: number;
  private height: number;
  private aspectRatio = 0.7;
  private colours;

  @HostListener('window:resize', ['$event'])
  onKeyUp(ev: UIEvent) {
    if (this.dataExists()) {
        this.createLinechart();
      }
  }

  constructor(private dataService: DataService, private errorService: ErrorHandlerService, private chartUtils: ChartUtilsService) {}

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.dataService.dataStream.subscribe((data) => {
      this.data = data;
      this.setAxes();
      if (this.dataExists()) {
        this.createLinechart();
      }
    });
  }

  private dataExists() {
    return this.data.length !== 0;
  }

  private setAxes() {
    const axes = [];
    for (const k in this.data[0]) {
      if (this.data[0].hasOwnProperty(k)) {
        axes.push(k)
      }
    }
    this.xAxis = axes[0];
    this.yAxis = axes[1];
  }

  private setSize() {
    const container = this.lineContainer.nativeElement;
    this.width = container.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.aspectRatio * this.width - this.margin.top - this.margin.bottom;
  }


  private createLinechart() {
    this.resetLinechart();
    this.setSize();

    const element = this.lineContainer.nativeElement;

    // Set the range
    const x = d3.scaleBand()
              .rangeRound([0, this.width])
              .padding(0.1);
    const y = d3.scaleLinear()
              .rangeRound([this.height, 0]);

    const line = d3.line()
      // .x(d => x(d[this.xAxis]))
      // .y(d => y(d[this.yAxis]));
      .x(d => x(d[this.xAxis]))
      .y(d => this.ySetLine(d, y));

    const svg = d3.select(element).append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
        .attr('transform',
              'translate(' + this.margin.left + ',' + this.margin.top + ')');

      // Scale the range of the data in the domains
      x.domain(this.data.map(d => d[this.xAxis]));
      y.domain(d3.extent(this.data, d => d[this.yAxis]));

      // X Axis
      svg.append('g')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(d3.axisBottom(x))
          .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)" );
      // X Axis label
      svg.select("g")
          .append("text")
            .attr("class", "label-style")
            .attr("x", 8)
            .attr("y", -this.width)
            .attr("dy", -6)
            .attr("transform", "rotate(90)" )
            .attr("text-anchor", "middle")
            .text(this.xAxis);

      // Y Axis
      svg.append('g')
          .call(d3.axisLeft(y))
        .append('text')
          .attr("class", "label-style")
          .attr("y", -6)
          .attr("text-anchor", "middle")
          .text(this.yAxis);

      svg.append('path')
          .datum(this.data)
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('stroke-width', 3)
          .attr('d', line);
  }

  private ySetLine(d, y) {
    const error = { title: 'Y Axis Error', content: 'Please enter a numeric value for the Y Axis.'};
    if (isNaN(this.height - y(d[this.yAxis]))) {
      this.errorService.handleError(error);
      this.resetLinechart();
    } else {
      return this.height - y(d[this.yAxis]);
    }
  }

  private resetLinechart() {
    this.chartUtils.resetSVG();
  }
}
