import { Component } from '@angular/core';
import { ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';
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
  ApexTooltip
} from 'ng-apexcharts';
import { BarChartComponent } from "../../../components/charts/bar-chart/bar-chart.component";
import { PieChartComponent } from "../../../components/charts/pie-chart/pie-chart.component";
import { DonutChartComponent } from "../../../components/charts/donut-chart/donut-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule, BarChartComponent, PieChartComponent, DonutChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
}
