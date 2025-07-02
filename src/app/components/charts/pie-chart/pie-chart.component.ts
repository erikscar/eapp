import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
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

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-pie-chart',
  imports: [NgApexchartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
   public series: ApexNonAxisChartSeries = [45, 16, 23, 5];
  
    public chartTitle: ApexTitleSubtitle = {
      text: "Produtos por Categoria",
      offsetY: 5,
      margin: 30,
      align: 'center',
      style: {
        fontFamily: "Poppins",
        fontWeight: 600,
        fontSize: '22px'
      }
    }
  
    public chart: ApexChart = {
      type: 'donut',
      height: 300,

    };
  
    public fill: ApexFill = {
     gradient: {type: 'gradient'}
    };
  
    public tooltip: ApexTooltip = {
      y: {
        formatter: (val: number) =>  val + ' Unidades'
      }
    };
  
    public legend: ApexLegend = {
      position: 'top'
    };
}
