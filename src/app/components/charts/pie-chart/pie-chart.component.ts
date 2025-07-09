import { Component, Input, OnChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';
import User from '../../../interfaces/User';
import { Category } from '../../../interfaces/Category';
import { Product } from '../../../interfaces/Product';

@Component({
  selector: 'app-pie-chart',
  imports: [NgApexchartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnChanges {
  @Input() users: User[] = [];
  @Input() categories: any[] = [];
  @Input() products: Product[] = [];

  public series: ApexNonAxisChartSeries = [];
  public labels: string[] = [];

  ngOnChanges(): void {
    if (this.categories.length) {
      const sortedItems = [...this.categories].sort(
        (a, b) => (b.products.length || 0) - (a.products.length || 0)
      );
      const top4Categories = sortedItems.slice(0, 4);
      const others = sortedItems.slice(4);

      this.series = top4Categories.map((c) => c.products?.length || 0);
      this.labels = top4Categories.map((c) => c.name);

      const othersTotal = others.reduce(
        (sum, c) => sum + (c.products?.length || 0),
        0
      );

      if (othersTotal > 0) {
        this.series.push(othersTotal);
        this.labels.push('Outros');
      }
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

  public colors: string[] = [
    '#715ae0',
    '#f9a03f',
    '#b8da7c',
    '#3ac2c8',
    '#999999',
  ];

  public fill: ApexFill = {
    gradient: { type: 'gradient' },
  };

  public tooltip: ApexTooltip = {
  y: {
    formatter: function (value: number, opts?: any): string {
      try {
        const total = opts?.w?.globals?.seriesTotals?.reduce((a: number, b: number) => a + b, 0) || 1;
        const percent = (value / total) * 10;
        return `${percent}% (${value})`;
      } catch (e) {
        return value.toString();
      }
    }
  }
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
      colors: '#000',
    },
  };
}
