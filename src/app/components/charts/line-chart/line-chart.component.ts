import { Component } from '@angular/core';
import {
  ApexChart,
  ApexTooltip,
  NgApexchartsModule,
  ApexStroke,
  ApexMarkers
} from 'ng-apexcharts';

@Component({
  selector: 'app-line-chart',
  imports: [NgApexchartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
public chart: ApexChart = {
  type: 'line',
  height: 160,
  toolbar: { show: false },
  zoom: { enabled: false },
  sparkline: {
    enabled: false
  }
};

public xaxis: ApexXAxis = {
  categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  labels: {
    style: {
      colors: '#fff', 
      fontSize: '12px'
    }
  },
  axisBorder: {
    show: false
  },
  axisTicks: {
    show: false
  }
};

public yaxis: ApexYAxis = {
  show: false,
}

public markers: ApexMarkers = {
  size: 3,             
  colors: ['#fff'],     
  strokeColors: '#fff', 
  strokeWidth: 2,
  shape: 'circle',      
  hover: {
    size: 7             
  }
};

public stroke: ApexStroke = {
  curve: 'smooth',
  width: 3
};

public colors: string[] = ['#ffffff'];

public series: ApexAxisChartSeries = [
  {
    name: 'R$',
    data: [200, 220, 180, 232, 210, 200, 220, 232, 210, 200, 220]
  }
];

public tooltip: ApexTooltip = {
  enabled: true,
  theme: 'dark'
};
}
