import { Routes } from '@angular/router';
import { ProductoListaComponent } from './productos/producto-lista/producto-lista.component';
import { ProductoDetalleComponent } from './productos/producto-detalle/producto-detalle.component';
import { CartComponent } from './cartas/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { HomeComponent } from './home/home/home.component';
import { CarComponent } from './carrito/car/car.component';
import { AgregarProductoComponent } from './proveedor/agregar-producto/agregar-producto.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'product/:id', component: ProductoDetalleComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'car', component: CarComponent },
  { path: 'agregar', component: AgregarProductoComponent }, // Ruta para agregar productos
];
