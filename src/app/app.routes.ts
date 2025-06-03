import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'admin-home',
    loadComponent: () => import('./pages/home-admin/home-admin.page').then(m => m.HomeAdminPage)
  },
  {
    path: 'profesor-home',
    loadComponent: () => import('./pages/home-profesor/home-profesor.page').then(m => m.HomeProfesorPage)
  },
  {
    path: 'alumno-home',
    loadComponent: () => import('./pages/home-alumno/home-alumno.page').then(m => m.HomeAlumnoPage)
  },  {
    path: 'lista-alumnos',
    loadComponent: () => import('./pages/lista-alumnos/lista-alumnos.page').then( m => m.ListaAlumnosPage)
  },

];
