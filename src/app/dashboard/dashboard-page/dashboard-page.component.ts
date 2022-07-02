import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ChartData, ChartOptions} from 'chart.js';


const API_URL = environment.API_URL;
var nikeCount: number
var adidasCount: number
var leviCount: number
export interface Product {
  name:string,
  price:number,
  brand:string,
  type:string,
  description:string
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  products: any = [];
  displayedColumns: string[] = ['Name', 'Price', 'Brand', 'Type', 'Description'];
  dataSource = new MatTableDataSource<Product>()

  brandData: ChartData<'bar'> = {
    labels: ['Nike', 'Adidas', 'Levi Strauss'],
    datasets: [
      { data: [7, 5, 3] },
    ],
  };

  brandChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Product Count by Brands',
      },
    },
  };

  productTypeData: ChartData<'pie'> = {
    labels: ['Footwear', 'Clothing', 'Accessories'],
    datasets: [
      { data: [7, 2, 6] },
    ],
  };

  productTypeChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Product Count by Product Type',
      },
    },
  };
  constructor(public http: HttpClient) { }

  ngOnInit(){
    this.getAllProducts();
  }
  //Retrieve products from API and display them in a table
  getAllProducts(){
    this.http.get(`${API_URL}/Product/GetAllProducts`)
    .subscribe(results => {
      this.products = results;
      this.dataSource.data = results as Product[];
    })
  }
}
