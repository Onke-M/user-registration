import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';


const API_URL = environment.API_URL;

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
