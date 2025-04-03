// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-producto-lista',
//   imports: [],
//   templateUrl: './producto-lista.component.html',
//   styleUrl: './producto-lista.component.css'
// })
// export class ProductoListaComponent {

// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink], // Importa CommonModule y RouterLink
  template: `
    <h2>Product List</h2>
    <div *ngFor="let product of products">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
      <a [routerLink]="['/product', product.id]">View Details</a>
    </div>
  `,
  styleUrls: ['./product-list.component.scss'],
})
export class ProductoListaComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://api.marketplace.com/products').subscribe((data) => {
      this.products = data;
    });
  }
}
