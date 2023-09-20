import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SeriesInterface } from 'src/app/core/interfaces/series.interface';
import { ChartService } from 'src/app/core/services/chart.service';
import { DynamicChartComponent } from './dynamic-chart/dynamic-chart.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild("container", { read: ViewContainerRef }) container: any;

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  @ViewChild('chart') componentRef: any;
  chartRef: any;
  selectedOption: string = "Nation";
  selectedStates: string[] = [];
  submitted:boolean = false;
  hasData: boolean = false;

  options = [
    { id: 1, name: 'Nation' },
    { id: 2, name: 'State' }
  ];

  arrStates:string[] = [];
  lastDataChart:string[] = [];

  chartOptions: Highcharts.Options = {
    title: {
      text: 'USA Population',
    },
    xAxis: {
      categories: ["2015", "2016", "2017", "2018", "2019", "2020"],
      title: {
        text: null,
      },
    },
    series: [
      {
        type: "line",
        name: "2015",
        color: "red",
        data: [1, 2, 3, 4, 5, 6]
      },
      {
        type: "line",
        data: [9]
      },
      {
        type: "line",
        data: [10]
      }
    ],
  };

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };



  constructor(private chartService: ChartService, private _cfr: ComponentFactoryResolver) {

  }

  ngOnInit() {
    this.hasData = true;
    this.chartService.getData("drilldowns=Nation&measures=Population&Year=2015,2016,2017,2018,2019,2020").subscribe((response: any) => {
      if (response) {
        this.lastDataChart = response.data;
        var output = this.fillChartData(response.data);
        this.generateComponent(output);
      }
    });
  }



  generateComponent(data: SeriesInterface[]) {
    if(this.container) {  
      this.container.clear();
      const factory: ComponentFactory<any> = this._cfr.resolveComponentFactory(DynamicChartComponent);
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.data = data;
    }

  }



  filterChart(isState: boolean):boolean {
    this.hasData = this.selectedOption ? true : false;
    if(isState && (!this.selectedStates || this.selectedStates.length == 0)) {
      
      return false;
    }
    var input: SeriesInterface[] = []
    this.chartService.getData(`drilldowns=${this.selectedOption}&measures=Population&Year=2015,2016,2017,2018,2019,2020`).subscribe((response: any) => {
      if (response) {
        this.lastDataChart = response.data;
        if(this.selectedOption == "State" && !isState) {
          this.arrStates = this.getUniqueStates(response.data);
        } else {
          input = this.fillChartData(response.data);
          this.generateComponent(input);
        }
      }
    });
    return true;
  };

  cleanStatesValues() {
    this.arrStates = [];
    this.selectedStates = [];
  }

  fillChartData(data:any[]) {
    var output: SeriesInterface[] = [];
    if(this.selectedStates && this.selectedStates.length > 0) {
      output = this.selectedStates.map((state:any)=> {
        return {
          type: "line",
          name: state,
          color: this.randomColor(),
          data: data.filter(z=> z.State == state).sort((a: any, b: any) => Number(a.Year) - Number(b.Year)).map((x: any) => { return x.Population }) || []
        }
      });
    }else {
      output = [{
        type: "line",
        name: "Population by Nation",
        color: "blue",
        data: data.sort((a: any, b: any) => Number(a.Year) - Number(b.Year)).map((x: any) => { return x.Population }) || []
      }];
    }
    return output;
  }

  getUniqueStates(arr: any[])  {
    return [...new Map(arr.map(item => [item["State"], item])).values()]?.map((x:any)=>{
      return x.State
    }) || [];
  }

   randomColor(){
    var allowed = "ABCDEF0123456789", S = "#";
     
    while(S.length < 7){
        S += allowed.charAt(Math.floor((Math.random()*16)+1));
    }
    return S;
 }
}
