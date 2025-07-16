import {
  Component,
  effect,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  ApexTooltip,
  ApexGrid,
  ApexTheme,
} from 'ng-apexcharts';
import User from '../../../interfaces/User';
import { Category } from '../../../interfaces/Category';
import { Product } from '../../../interfaces/Product';
import { ThemeService } from '../../../services/theme.service';
import { applyChartTheme } from '../../../utils/chart-theme.util';

@Component({
  selector: 'app-bar-chart',
  imports: [NgApexchartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements OnChanges {
  @Input() users: User[] = [];
  @Input() categories: Category[] = [];
  @Input() products: Product[] = [];
  public series: ApexAxisChartSeries = [];

  private themeService = inject(ThemeService);

  constructor() {
    effect(() => {
      applyChartTheme(
        () => this.themeService.theme(),
        this.chartTitle,
        this.legend,
        this.series.length,
        this.xaxis,
        this.yaxis
      );
    });
  }

  dataPerMonth(data: any[]): number[] {
    const count: { [key: number]: number } = {
      //Janeiro = 0, Fevereiro = 1, Março = 2 / Todos Iniciando com o Valor 0 e sendo populado de acordo com os meses ...
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
    };

    data.forEach((item) => {
      const month = new Date(item.createdAt).getMonth();
      count[month]++;
    });

    return Object.values(count);
  }

  ngOnChanges(): void {
    this.series = [
      {
        name: 'Usuários',
        data: this.dataPerMonth(this.users),
        color: '#3399CC',
      },
      {
        name: 'Produtos',
        data: this.dataPerMonth(this.products),
        color: '#FF4C4C',
      },
      {
        name: 'Categorias',
        data: this.dataPerMonth(this.categories),
        color: '#FFA500',
      },
    ];
  }

  public chartTitle: ApexTitleSubtitle = {
    text: 'Relatório de Registros',
    offsetY: 20,
    offsetX: 20,
    style: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '18px',
      color: '',
    },
  };

  public chart: ApexChart = {
    type: 'bar',
    height: 330,
    toolbar: {
      show: false,
    },
  };

  public plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '70%',
      borderRadius: 4,
    },
  };

  public dataLabels: ApexDataLabels = {
    enabled: false,
  };

  public stroke: ApexStroke = {
    show: true,
    width: 2,
    colors: ['transparent'],
  };

  public xaxis: ApexXAxis = {
    categories: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    labels: {
      style: {
        colors: [],
      },
    },
  };

  public yaxis: ApexYAxis = {
    title: {
      text: 'Quantidade',
      style: {
        fontSize: '16px',
        fontFamily: 'Poppins',
        color: '',
      },
    },
    labels: {
      style: {
        colors: [],
      },
    },
  };

  public fill: ApexFill = {
    opacity: 1,
  };

  public tooltip: ApexTooltip = {
    y: {
      formatter: (val: number) => val + ' Unidades',
    },
  };

  public legend: ApexLegend = {
    position: 'top',
    labels: {
      colors: [],
    },
  };
}
