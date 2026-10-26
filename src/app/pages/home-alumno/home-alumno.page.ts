import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IonicModule } from '@ionic/angular';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, QRCodeComponent]
})
export class HomeAlumnoPage implements OnInit {
  nombre: string = '';
  tipo: string = '';
  asignaturas: any[] = [];
  rut: string = '';
  mostrarQR: boolean = false;
  qrData: string = '';
  asignaturaSeleccionada: any;
  fechaActual: string = '';
  horaActual: string = '';
  diaSeleccionado: string = '';
  loading: boolean = true;

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
    this.rut = localStorage.getItem('rut') || '';

    const diaActual = new Date().toLocaleDateString('es-CL', {
      weekday: 'long',
      timeZone: 'America/Santiago'
    });
    this.diaSeleccionado = diaActual.charAt(0).toUpperCase() + diaActual.slice(1);

    this.cargarAsignaturas();
    this.actualizarHora();
  }

  async cambioDia() {
    this.loading = true;
    await this.cargarAsignaturas();
    this.loading = false;
  }

  async cargarAsignaturas() {
    const ref = collection(this.firestore, 'asignaturas');
    const q = query(ref, where('alumnos', 'array-contains', this.rut));
    const snap = await getDocs(q);

    this.asignaturas = snap.docs
      .map(doc => ({
        id: doc.id,
        ...(doc.data() as any)
      }))
      .filter(a => a.dia === this.diaSeleccionado);
  }

  generarQR(asignatura: any) {
    this.asignaturaSeleccionada = asignatura;
    this.qrData = JSON.stringify({
      rut: this.rut,
      nombre: this.nombre,
      asignaturaId: asignatura.id,
      timestamp: new Date().getTime()
    });
    this.mostrarQR = true;
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

  logout() {
    this.authService.logout();
  }
}