import { Component } from '@angular/core';
import { ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';
import { BarChartComponent } from "../../../components/charts/bar-chart/bar-chart.component";
import { PieChartComponent } from "../../../components/charts/pie-chart/pie-chart.component";
import { DonutChartComponent } from "../../../components/charts/donut-chart/donut-chart.component";
import { LineChartComponent } from "../../../components/charts/line-chart/line-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule, BarChartComponent, PieChartComponent, DonutChartComponent, LineChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
}
