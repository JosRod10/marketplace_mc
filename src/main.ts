import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';

// Configuración de la aplicación
const appConfig = {
  providers: [
    provideRouter(routes), // Configura las rutas
    provideHttpClient(), // Habilita HttpClient
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Inicializa Firebase
    provideAuth(() => getAuth()), // Habilita Firebase Auth
    provideFirestore(() => getFirestore()), // Proporciona Firestore,
    provideStorage(() => getStorage()) // Agrega Firebase Storage como proveedor
    // importProvidersFrom(HttpClientModule), // Importa HttpClientModule
  ],
};

// Inicia la aplicación
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));