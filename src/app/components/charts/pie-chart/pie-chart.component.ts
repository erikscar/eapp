import { Component, effect, inject, Input, OnChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexStroke
} from 'ng-apexcharts';
import User from '../../../interfaces/User';
import { Category } from '../../../interfaces/Category';
import { Product } from '../../../interfaces/Product';
import { ThemeService } from '../../../services/theme.service';
import { applyChartTheme } from '../../../utils/chart-theme.util';

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
  private themeService = inject(ThemeService);

  constructor() {
    effect(() => { this.updateThemeColors()
    });
  }

  updateThemeColors() {
  const theme = this.themeService.theme();
  const fontColor = theme === 'dark' ? '#fff' : '#000';

  this.chartTitle = {
    ...this.chartTitle,
    style: {
      ...this.chartTitle.style,
      color: fontColor,
    },
  };

  this.legend = {
    ...this.legend,
    labels: {
      ...this.legend.labels,
      colors: new Array(this.series.length).fill(fontColor),
    },
  };
}
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

    this.updateThemeColors();
  }

  public chartTitle: ApexTitleSubtitle = {
    text: 'Produtos por Categoria ( % )',
    align: 'center',
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
    '#3399CC',
    '#FF4C4C',
    '#FFA500',
    '#B399FF',
    '#7CFF79',
  ];

  public fill: ApexFill = {
    gradient: { type: 'gradient' },
  };

  public tooltip: ApexTooltip = {
    y: {
      formatter: function (value: number, opts?: any): string {
        try {
          const total =
            opts?.w?.globals?.seriesTotals?.reduce(
              (a: number, b: number) => a + b,
              0
            ) || 1;
          const percent = (value / total) * 10;
          return `${percent}% (${value})`;
        } catch (e) {
          return value.toString();
        }
      },
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
      colors: [],
    },
  };

    public stroke: ApexStroke = {
    show: false,
    width: 0,
  };
  
}
