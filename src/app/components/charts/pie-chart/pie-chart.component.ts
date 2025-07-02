import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';

@Component({
  selector: 'app-pie-chart',
  imports: [NgApexchartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
   public series: ApexNonAxisChartSeries = [50, 25, 25];
  public labels = ['Eletrônicos', 'Hardware', 'Automóveis'];

  public chartTitle: ApexTitleSubtitle = {
    text: 'Produtos por Categoria ( % )',
    align: 'left',
    offsetY: -2,
    style: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '16px',
    },
  };

  public chart: ApexChart = {
    type: 'donut',
    height: 300,
  };

  public colors: string[] = ['#715ae0', '#f9a03f', '#b8da7c'];

  public fill: ApexFill = {
    gradient: { type: 'gradient' },
  };

  public tooltip: ApexTooltip = {
    y: {
      formatter: (val: number) => val + '%',
    },
  };

  public plotOptions: ApexPlotOptions = {
    pie: {
      donut: {
        size: '85%',
      },
    },
  };

  public dataLabels: ApexDataLabels = {
    enabled: false,
  };

  public legend: ApexLegend = {
    position: 'bottom',
    fontFamily: 'Poppins',
    labels: {
      useSeriesColors: false,
      colors: '#000'
    }
  };
}
