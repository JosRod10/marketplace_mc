import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-agregar-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
})
export class AgregarProductoComponent {
  productoForm: FormGroup;
  imagenSeleccionada: File | null = null; // Almacena el archivo seleccionado
  user?: Usuario;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagen: [''], // No es necesario un validador aquí, ya que el archivo se maneja manualmente
    });
  }
  ngOnInit(){
    this.productoService.currentUser.subscribe(user => {
      this.user = user; // Actualiza la variable local con el usuario del servicio      
      console.log(this.user?.nomNegocio); // Agregado para depuración
    });
  }

  // Maneja la selección del archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      this.imagenSeleccionada = file; // Almacena el archivo en una variable
      console.log('Archivo seleccionado:', file.name);
    }
  }

  // Método para agregar un producto
  agregarProducto() {
    if (this.productoForm.valid && this.imagenSeleccionada) {
      const producto = this.productoForm.value;

      // Crea un objeto FormData para enviar el archivo
      const formData = new FormData();
      formData.append('nombre', producto.nombre);
      formData.append('descripcion', producto.descripcion);
      formData.append('precio', producto.precio);
      formData.append('imagen', this.imagenSeleccionada); // Agrega la imagen al FormData
      formData.append('nomNegocio', this.user ? this.user.nomNegocio ?? '' : '');
      // Envía el FormData al servicio
      this.productoService.agregarProducto(formData).then(() => {
        
      });
    } else {
      console.log('Formulario inválido o no se ha seleccionado una imagen.');
    }
  }
}
