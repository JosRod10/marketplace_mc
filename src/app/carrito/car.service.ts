import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // El servicio estará disponible en toda la aplicación
})
export class CarService {
  private productos: any[] = []; // Almacena los productos en el carrito

  constructor() {}

  // Agrega un producto al carrito
  agregarProducto(producto: any) {
    this.productos.push(producto);
  }

  // Elimina un producto del carrito
  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }

  // Obtiene todos los productos del carrito
  obtenerProductos() {
    return this.productos;
  }

  // Limpia el carrito
  limpiarCarrito() {
    this.productos = [];
  }
}