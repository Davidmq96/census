import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/core/services/chart.service';

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
})
export class DynamicChartComponent implements OnInit {
  @Input() data:any;
  @ViewChild('chart') componentRef: any;
  chartRef: any;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
  };



  constructor(private chartService: ChartService) {

  }

  ngOnInit() {
    this.chartOptions= {
      title: {
        text: 'USA Population',
      },
      xAxis: {
        categories: ["2015", "2016", "2017", "2018", "2019", "2020"],
        title: {
          text: null,
        },
      },
      series: this.data,
    };
  }

}
