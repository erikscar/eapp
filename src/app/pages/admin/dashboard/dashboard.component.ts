import { Component, OnInit } from '@angular/core';
import { ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';
import { BarChartComponent } from '../../../components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '../../../components/charts/pie-chart/pie-chart.component';
import { DonutChartComponent } from '../../../components/charts/donut-chart/donut-chart.component';
import { LineChartComponent } from '../../../components/charts/line-chart/line-chart.component';
import { CategoryService } from '../../../services/category/category.service';
import { UserService } from '../../../services/user/user.service';
import { ProductService } from '../../../services/product/product.service';
import { Category } from '../../../interfaces/Category';
import User from '../../../interfaces/User';
import { Product } from '../../../interfaces/Product';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgApexchartsModule,
    BarChartComponent,
    PieChartComponent,
    DonutChartComponent,
    LineChartComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  users: User[] = [];
  products: Product[] = [];
  latestRecords: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private productService: ProductService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.dashboardService.getLatestRecords().subscribe({
      next: (res) => {
        console.log("Ultimos Registros: " + res)
        this.latestRecords = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
