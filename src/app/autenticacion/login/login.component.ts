import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Importa las funciones necesarias de Firestore
import { FirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', []]
    });
  }

  ngOnInit(): void {}

  // Método que se llama al enviar el formulario
  async onSubmit() {
    if (this.loginForm.valid) {
      const { correo, contrasena } = this.loginForm.value;

      // Llamamos a la función para verificar si el usuario existe
      console.log(contrasena, correo);
      const usuarioExiste = await this.verificarUsuario(correo, contrasena);
      console.log(usuarioExiste);
      if (usuarioExiste) {
        // Si el usuario existe, redirige al home
        this.router.navigate(['/home']);
      } else {
        // Si el usuario no existe, muestra un mensaje o redirige a registro
        alert('Usuario no encontrado. Por favor, regístrate.');
        this.router.navigate(['/register']);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Método para verificar si el usuario existe en la colección de Firebase
  async verificarUsuario(correo: string, contrasena: string): Promise<boolean> {
    const db = getFirestore(); // Obtener la instancia de Firestore
    const usuariosRef = collection(db, 'usuarios');
    const q = query(usuariosRef, where('correo', '==', correo));

    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      if (!querySnapshot.empty) {
        const usuario = querySnapshot.docs[0].data();
        // Verifica la contraseña (puedes implementar un sistema de autenticación seguro aquí)
        if (usuario['contrasena'] === contrasena) {
          return true; // El usuario existe y la contraseña es correcta
        }
      }
    } catch (error) {
      console.error('Error al verificar el usuario:', error);
    }

    return false; // El usuario no existe o la contraseña es incorrecta
  }

  // Método para redirigir al registro
  direccionarRegistro() {
    this.router.navigate(['/register']);
  }
}

