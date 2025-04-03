import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../proveedor/producto.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css'],
})
export class ProductoDetalleComponent implements OnInit {
  producto: any; // Variable para almacenar el producto seleccionado
  productos: any[] = []; // Lista de productos
  constructor(private route: ActivatedRoute, private http: HttpClient, private productoService: ProductoService) {}

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el parámetro 'id' de la URL
    if (id) {
      this.productoService.obtenerProductoPorId(id).then((producto) => {
        this.producto = producto;
      });
    }
  }

  addToCart(product: any): void {
    console.log('Added to cart:', product);
  }
}
