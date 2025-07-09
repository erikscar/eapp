import { Component, Input, OnChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';
import User from '../../../interfaces/User';
import { Category } from '../../../interfaces/Category';
import { Product } from '../../../interfaces/Product';

@Component({
  selector: 'app-pie-chart',
  imports: [NgApexchartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnChanges {
  @Input() users: User[] = []
  @Input() categories: any[] = []
  @Input() products: Product[] = []

  public series: ApexNonAxisChartSeries = [];
  public labels: string[] = [];

  ngOnChanges(): void {
    if (this.categories.length) {
      this.series = this.categories.map(c => c.products?.length || 0);
      this.labels = this.categories.map(c => c.name);
    }
  }

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
