import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems: any[] = []; // Simulación de productos en el carrito

  checkout(): void {
    console.log('Proceeding to checkout...');
  }
}
