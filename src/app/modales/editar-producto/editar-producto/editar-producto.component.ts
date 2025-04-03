import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductoService } from '../../../proveedor/producto.service';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
  imagenSeleccionada?: File; // Variable para almacenar la imagen
  user?: any; // Usuario actual

  constructor(
    public dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productoService: ProductoService // Inyectamos el servicio de productos
  ) {}

  guardarCambios(form: NgForm): void {
    if (form.valid) {
      this.editarProducto(this.data.id);
    } else {
      console.log('Formulario inválido.');
    }
  }

  editarProducto(productoId: string): void {
    const productoActualizado: any = {
      nombre: this.data.nombre,
      descripcion: this.data.descripcion,
      precio: this.data.precio,
      nomNegocio: this.user ? this.user.nomNegocio ?? '' : ''
    };

    if (this.imagenSeleccionada) {
      const formData = new FormData();
      formData.append('nombre', this.data.nombre);
      formData.append('descripcion', this.data.descripcion);
      formData.append('precio', this.data.precio);
      formData.append('imagen', this.imagenSeleccionada);
      formData.append('nomNegocio', this.user ? this.user.nomNegocio ?? '' : '');

      this.productoService.actualizarProducto(productoId, formData).then(() => {
        console.log('Producto actualizado con imagen.');
        this.dialogRef.close(true);
      });
    } else {
      this.productoService.actualizarProducto(productoId, productoActualizado).then(() => {
        console.log('Producto actualizado sin cambios en la imagen.');
        this.dialogRef.close(true);
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}


