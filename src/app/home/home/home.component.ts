import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../proveedor/producto.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/interfaces';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarProductoComponent } from '../../modales/editar-producto/editar-producto/editar-producto.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule], // Importa CommonModule y RouterModule
  templateUrl: './home.component.html', // Ruta al archivo HTML
  styleUrls: ['./home.component.css'], // Ruta al archivo de estilos (opcional)
})
export class HomeComponent implements OnInit {
  
  productos: any[] = []; // Lista de productos
  user?: Usuario;
  constructor(private http: HttpClient, 
    private productoService: ProductoService, 
    private router: Router,
    private dialog: MatDialog) {}

    ngOnInit(): void {
      // console.log("hola");
      // const navigation = this.router.getCurrentNavigation();
      // if (navigation?.extras.state) {
      //     this.user = navigation.extras.state['user'];
      //     console.log('Usuario recibido:', this.user); // Agregado para depuración
      //     console.log('Tipo de usuario:', this.user?.tipoUsuario); // Agregado para depuración
      // } else {
      //     console.log('No se recibió el usuario en la navegación.');
      // }
      this.productoService.currentUser.subscribe(user => {
        this.user = user; // Actualiza la variable local con el usuario del servicio
        console.log(this.user);
        console.log('Tipo de usuario:', this.user?.tipoUsuario); // Agregado para depuración
      });
      
      this.productoService.obtenerProductos().subscribe((productos) => {
          this.productos = productos;
          console.log('Productos recibidos:', this.productos); // Agregado para depuración
      });
  }

  abrirModalEdicion(producto: any): void {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '400px',
      data: { ...producto } // Pasamos una copia del producto al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Producto actualizado:', result);
        // Aquí puedes actualizar la lista de productos en tu componente
      }
    });
  }
  

  verDetalleProducto(id: string) {
    this.router.navigate(['/producto', id]); // Navega a la ruta con el ID del producto
  }

  // Método para eliminar un producto
  eliminarProducto(productoId: string): void {
    this.productoService.eliminarProducto(productoId).then(() => {
      console.log('Producto eliminado correctamente');
      // Aquí puedes volver a obtener los productos para reflejar el cambio
      this.productoService.obtenerProductos().subscribe((productos) => {
        this.productos = productos;
      });
    }).catch(error => {
      console.error('Error al eliminar el producto', error);
    });
  }
  
}