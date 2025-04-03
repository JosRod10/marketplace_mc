import { Component } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth'; // Importa Auth y onAuthStateChan
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent], // Importa componentes y directivas
  template: `
    <app-header />
    <router-outlet />
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuthenticated = false; // Estado de autenticación del usuario

  constructor(private auth: Auth, private router: Router) {
    // Escucha los cambios en el estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.isAuthenticated = !!user; // Actualiza el estado de autenticación
      if(this.isAuthenticated == true){
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/login']);
      }
      console.log(this.isAuthenticated);
    });
  }
}
