import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Usa las rutas definidas en app.routes
    provideHttpClient(), // Proporciona HttpClient para toda la aplicación
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Inicializa Firebase
    provideAuth(() => getAuth()), // Proporciona Firebase Auth
  ],
};

