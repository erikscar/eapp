import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexDataLabels,
  ApexFill,
  ApexTooltip,
  NgApexchartsModule,
  ApexPlotOptions,
  ApexTheme
} from 'ng-apexcharts';
import User from '../../../interfaces/User';
import { Category } from '../../../interfaces/Category';
import { Product } from '../../../interfaces/Product';

@Component({
  selector: 'app-donut-chart',
  imports: [NgApexchartsModule],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss',
})
export class DonutChartComponent implements OnChanges {
  @Input() users: User[] = []
  @Input() categories: Category[] = []
  @Input() products: Product[] = []

  public series: ApexNonAxisChartSeries = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.series = [this.users.length, this.products.length, this.categories.length]
  }

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
