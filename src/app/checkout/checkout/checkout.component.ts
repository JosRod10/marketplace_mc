import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  template: `
    <h2>Checkout</h2>
    <form (ngSubmit)="onSubmit()">
      <label for="name">Name:</label>
      <input id="name" type="text" required />
      <label for="card">Card Number:</label>
      <input id="card" type="text" required />
      <button type="submit">Place Order</button>
    </form>
  `,
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  onSubmit(): void {
    console.log('Order placed successfully!');
  }
}
