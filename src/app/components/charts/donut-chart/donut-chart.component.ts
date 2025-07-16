import {
  Component,
  effect,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexDataLabels,
  ApexFill,
  ApexTooltip,
  NgApexchartsModule,
  ApexPlotOptions,
  ApexTheme,
  ApexStroke
} from 'ng-apexcharts';
import User from '../../../interfaces/User';
import { Category } from '../../../interfaces/Category';
import { Product } from '../../../interfaces/Product';
import { applyChartTheme } from '../../../utils/chart-theme.util';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-donut-chart',
  imports: [NgApexchartsModule],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss',
})
export class DonutChartComponent implements OnChanges {
  @Input() users: User[] = [];
  @Input() categories: Category[] = [];
  @Input() products: Product[] = [];

  public series: ApexNonAxisChartSeries = [];
  private themeService = inject(ThemeService);
  constructor() {
    effect(() => {
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
    });
  }

  ngOnChanges(): void {
    this.series = [
      this.users.length,
      this.products.length,
      this.categories.length,
    ];
  }

  public labels = ['Usuários', 'Produtos', 'Categorias'];

  public chartTitle: ApexTitleSubtitle = {
    text: 'Total de Registros',
    align: 'center',
    style: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '16px',
      color: '',
    },
  };

  public chart: ApexChart = {
    type: 'donut',
    height: 290,
  };

  public colors: string[] = ['#3399CC', '#FF4C4C', '#FFA500'];

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

  public stroke: ApexStroke = {
  show: false,
  width: 0,
};

  public legend: ApexLegend = {
    position: 'bottom',
    fontFamily: 'Poppins',
    labels: {
      useSeriesColors: false,
      colors: '',
    },
  };
}
