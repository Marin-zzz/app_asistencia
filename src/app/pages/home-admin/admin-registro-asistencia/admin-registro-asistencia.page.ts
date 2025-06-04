import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-registro-asistencia',
  templateUrl: './admin-registro-asistencia.page.html',
  styleUrls: ['./admin-registro-asistencia.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AdminRegistroAsistenciaPage implements OnInit {
  asignaturas: any[] = [];

  constructor(private firestore: Firestore, private router: Router) {}

  async ngOnInit() {
    const snapshot = await getDocs(collection(this.firestore, 'asignaturas'));
    this.asignaturas = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        nombreCompleto: `${data['nombre']}_${data['seccion']}` // Aquí se concatena nombre y sección
      };
    });
  }

  verDetalle(asignaturaId: string) {
    this.router.navigate(['/asignatura-detalle-admin'], {
      queryParams: { id: asignaturaId }
    });
  }

  volver() {
    this.router.navigate(['/admin-home']);
  }
}
