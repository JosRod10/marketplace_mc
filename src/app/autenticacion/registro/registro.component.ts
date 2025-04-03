// import { Component } from '@angular/core';
// import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-registro',
//   standalone: true,
//   templateUrl: './registro.component.html',
//   styleUrls: ['./registro.component.css'],
// })
// export class RegistroComponent {
//   constructor(private auth: Auth, private router: Router) {} // Inyecta el servicio Auth

//   // Método para registrarse con Google
//   async registerWithGoogle() {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(this.auth, provider);
//       console.log('Registro exitoso:', result.user);
//       // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
//       this.router.navigate(['/home']);
//     } catch (error) {
//       console.error('Error durante el registro:', error);
//       // Aquí puedes mostrar un mensaje de error al usuario
//     }
//   }
// }

import { Component } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../proveedor/producto.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports:[FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  tipoUsuario: string = ''; // Variable para almacenar el tipo de usuario seleccionado
  nomNegocio: string = ''; // Variable para almacenar el nombre del negocio
  contrasena: string = '';
  user?: Usuario; // Variable para almacenar los datos del usuario

  constructor(private auth: Auth, 
    private router: Router,
    private service: ProductoService) {} // Inyecta el servicio Auth

  // Método para registrarse con Google
  async registerWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      console.log('Registro exitoso:', result.user);

      // Obtiene los datos del usuario
      this.user = {
        displayName: result.user.displayName,
        email: result.user.email,
        lastSignInTime: result.user.metadata?.lastSignInTime || new Date().toISOString(),
        accessToken: await result.user.getIdToken(), // Obtiene el token de acceso
        uid: result.user.uid,
        tipoUsuario: this.tipoUsuario, // Agrega el tipo de usuario seleccionado
        nomNegocio: this.nomNegocio, // Agrega el nombre del negocio
        contrasena: this.contrasena
      };
      this.service.agregarUsuario(this.user);
      
      console.log('Datos del usuario:', this.user);
      // Actualiza el usuario en el servicio
      this.service.updateUser(this.user);
      // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      this.router.navigate(['/home']);
      // this.router.navigate(['/home'], { state: { user: this.user } });

    } catch (error) {
      console.error('Error durante el registro:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  }

  direccionarLogin(){
    this.router.navigate(['/login']); 
  }
}
