import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public series: ApexAxisChartSeries = [
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    },
    {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }
  ];

  public chart: ApexChart = {
    type: 'bar',
    height: 350
  };

  public plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '55%'
    }
  };

  public dataLabels: ApexDataLabels = {
    enabled: false
  };

  public stroke: ApexStroke = {
    show: true,
    width: 2,
    colors: ['transparent']
  };

  public xaxis: ApexXAxis = {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  };

  public yaxis: ApexYAxis = {
    title: {
      text: '$ (thousands)'
    }
  };

  public fill: ApexFill = {
    opacity: 1
  };

  public tooltip: ApexTooltip = {
    y: {
      formatter: (val: number) => '$ ' + val + ' thousands'
    }
  };

  public legend: ApexLegend = {
    position: 'top'
  };
}
