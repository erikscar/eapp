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
  ApexTooltip,
  ApexGrid
} from 'ng-apexcharts';


@Component({
  selector: 'app-bar-chart',
  imports: [NgApexchartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
   public series: ApexAxisChartSeries = [
      {
        name: 'Usuários',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        color: '#715ae0'
      },
      {
        name: 'Produtos',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        color: '#f9a03f'
      },
      {
        name: 'Categorias',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        color: '#b8da7c'
      }
    ];
  
    public chartTitle: ApexTitleSubtitle = {
      text: "Relatório de Registros",
      offsetY: 20,
      offsetX: 20,
      style: {
        fontFamily: "Poppins",
        fontWeight: 600,
        fontSize: '22px'
      }
    }
  
    public chart: ApexChart = {
      type: 'bar',
      height: 330,
      toolbar: {
        show: false
      },
    };
  
    public plotOptions: ApexPlotOptions = {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4
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
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    };
  
    public yaxis: ApexYAxis = {
      title: {
        text: 'Quantidade',
        style: {
          fontSize: '14px',
          fontFamily: 'Poppins'
        }
      }
    };
  
    public fill: ApexFill = {
      opacity: 1
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
