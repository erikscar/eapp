import { Component } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexDataLabels,
  ApexFill,
  ApexTooltip,
  NgApexchartsModule,
  ApexPlotOptions,
} from 'ng-apexcharts';

@Component({
  selector: 'app-donut-chart',
  imports: [NgApexchartsModule],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss',
})
export class DonutChartComponent {
  public series: ApexNonAxisChartSeries = [45, 16, 23];
  public labels = ['Usuários', 'Produtos', 'Categorias'];

  public chartTitle: ApexTitleSubtitle = {
    text: 'Total de Registros',
    align: 'center',
    style: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '16px',
    },
  };

  public chart: ApexChart = {
    type: 'donut',
    height: 290,
  };

  public colors: string[] = ['#715ae0', '#f9a03f', '#b8da7c'];

  public fill: ApexFill = {
    gradient: { type: 'gradient' },
  };

  public tooltip: ApexTooltip = {
    y: {
      formatter: (val: number) => val + ' Unidades',
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
