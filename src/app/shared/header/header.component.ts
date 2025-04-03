import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ProductoService } from '../../proveedor/producto.service';
import { Usuario } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule], // Importa RouterLink para navegación
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private auth: Auth, 
    private router: Router,
    private service: ProductoService) {}

  isMenuOpen = false; // Estado del menú (abierto/cerrado)
  user?: Usuario;
  tipoUsuario?: string = '';
  menuStatus: any;

  ngOnInit(): void {
    // this.menuStatus = this.service.closeHeader(menuStatus =>{
    //   this.menuStatus = menuStatus;
    // });
    
    this.service.currentUser.subscribe(user => {
      this.user = user; // Actualiza la variable local con el usuario del servicio
      this.tipoUsuario = this.user?.tipoUsuario;
      console.log(this.user);
      console.log('Tipo de usuario:', this.user?.tipoUsuario); // Agregado para depuración
    });
  }

   // Método para verificar si se encuentra en una ruta específica
   shouldShowHeader(): boolean {
    return this.router.url !== '/register' && this.router.url !== '/login';
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await signOut(this.auth); // Cierra la sesión del usuario
      this.closeMenu();
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Alternar el estado del menú
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Cerrar el menú
  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
