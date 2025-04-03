import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarService } from '../car.service';
@Component({
  selector: 'app-car',
  standalone: true, // Marca el componente como standalone
  imports: [CommonModule, RouterModule], // Importa los módulos necesarios
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarComponent {
  productos: any[] = []; // Lista de productos en el carrito

  constructor(private carritoService: CarService) {
    this.productos = this.carritoService.obtenerProductos(); // Obtiene los productos del carrito
  }

  // Elimina un producto del carrito
  eliminarProducto(index: number) {
    this.carritoService.eliminarProducto(index);
  }

  // Limpia el carrito
  limpiarCarrito() {
    this.carritoService.limpiarCarrito();
    this.productos = []; // Actualiza la lista de productos
  }
}
