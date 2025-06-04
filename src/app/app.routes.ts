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
  },
  {
    path: 'lista-alumnos',
    loadComponent: () => import('./pages/lista-alumnos/lista-alumnos.page').then( m => m.ListaAlumnosPage)
  },
  {
    path: 'admin-crear-usuario',
    loadComponent: () => import('./pages/home-admin/admin-usuarios/admin-crear-usuario/admin-crear-usuario.page').then( m => m.AdminCrearUsuarioPage)
  },
  {
    path: 'admin-usuarios',
    loadComponent: () => import('./pages/home-admin/admin-usuarios/admin-usuarios.page').then( m => m.AdminUsuariosPage)
  },
  {
    path: 'admin-listar-usuarios',
    loadComponent: () => import('./pages/home-admin/admin-usuarios/admin-listar-usuarios/admin-listar-usuarios.page').then( m => m.AdminListarUsuariosPage)
  },
  {
    path: 'admin-editar-usuario',
    loadComponent: () => import('./pages/home-admin/admin-usuarios/admin-editar-usuario/admin-editar-usuario.page').then( m => m.AdminEditarUsuarioPage)
  },
  {
    path: 'admin-asignaturas',
    loadComponent: () => import('./pages/home-admin/admin-asignaturas/admin-asignaturas.page').then( m => m.AdminAsignaturasPage)
  },
  {
    path: 'crear-asignatura',
    loadComponent: () => import('./pages/home-admin/admin-asignaturas/crear-asignatura/crear-asignatura.page').then( m => m.CrearAsignaturaPage)
  },
  {
    path: 'listar-asignaturas',
    loadComponent: () => import('./pages/home-admin/admin-asignaturas/listar-asignaturas/listar-asignaturas.page').then( m => m.ListarAsignaturasPage)
  },
  {
    path: 'editar-asignatura/:id',
    loadComponent: () => import('./pages/home-admin/admin-asignaturas/editar-asignatura/editar-asignatura.page').then( m => m.EditarAsignaturaPage)
  },


];
