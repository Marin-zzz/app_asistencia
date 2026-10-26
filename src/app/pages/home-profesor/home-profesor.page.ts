import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IonicModule } from '@ionic/angular';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.page.html',
  styleUrls: ['./home-profesor.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomeProfesorPage implements OnInit {
  asignaturas: any[] = [];
  nombre: string = '';
  tipo: string = '';
  loading: boolean = true;
  userEmail: string = '';
  debugInfo: any = {};
  showDebugInfo: boolean = false;
  horaActual: string = '';
  fechaActual: string = '';

  // Nuevo: día seleccionado, por defecto es el día actual
  diaSeleccionado: string = '';

  diasSemana = [
    { valor: 'Lunes', texto: 'Lunes' },
    { valor: 'Martes', texto: 'Martes' },
    { valor: 'Miércoles', texto: 'Miércoles' },
    { valor: 'Jueves', texto: 'Jueves' },
    { valor: 'Viernes', texto: 'Viernes' },
    { valor: 'Sábado', texto: 'Sábado' },
    { valor: 'Domingo', texto: 'Domingo' }
  ];

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre') || '';
    this.tipo = localStorage.getItem('tipo') || '';
    this.userEmail = localStorage.getItem('correo') || 'No encontrado';

    this.debugInfo = {
      correo: this.userEmail,
      nombre: this.nombre,
      tipo: this.tipo,
      localStorage: {
        correo: localStorage.getItem('correo'),
        nombre: localStorage.getItem('nombre'),
        tipo: localStorage.getItem('tipo')
      }
    };

    // Setear diaSeleccionado como el día actual
    const diaActual = new Date().toLocaleDateString('es-CL', {
      weekday: 'long',
      timeZone: 'America/Santiago'
    });
    this.diaSeleccionado = diaActual.charAt(0).toUpperCase() + diaActual.slice(1);

    this.actualizarHora();
  }

  async ionViewWillEnter() {
    this.loading = true;
    await this.cargarAsignaturas();
    this.loading = false;
  }

  logout() {
    this.authService.logout();
  }

  verLocalStorage() {
    this.showDebugInfo = !this.showDebugInfo;
  }

  // Al cambiar el día seleccionado recargamos las asignaturas
  async cambioDia() {
    this.loading = true;
    await this.cargarAsignaturas();
    this.loading = false;
  }

  async cargarAsignaturas() {
    const correo = localStorage.getItem('correo');

    const ref = collection(this.firestore, 'asignaturas');
    const q = query(ref, where('profesores', 'array-contains', correo));
    const snap = await getDocs(q);

    const todas = snap.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as any)
    }));

    this.asignaturas = todas.filter(a => a.dia === this.diaSeleccionado);
  }

  irALista(asignatura: any) {
    this.router.navigate(['/lista-alumnos'], { queryParams: { id: asignatura.id } });
  }


  actualizarHora() {
    const actualizar = () => {
      const ahora = new Date();
      this.fechaActual = ahora.toLocaleDateString('es-CL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Santiago'
      });
      this.horaActual = ahora.toLocaleTimeString('es-CL', {
        timeZone: 'America/Santiago',
        hour12: false
      });
    };
    actualizar();
    setInterval(actualizar, 1000);
  }
}
