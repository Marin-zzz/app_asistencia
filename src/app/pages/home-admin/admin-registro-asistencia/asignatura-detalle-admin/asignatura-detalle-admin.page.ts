import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignatura-detalle-admin',
  templateUrl: './asignatura-detalle-admin.page.html',
  styleUrls: ['./asignatura-detalle-admin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AsignaturaDetalleAdminPage implements OnInit {
  asignaturaId: string = '';
  registros: any[] = [];

  constructor(private route: ActivatedRoute, private firestore: Firestore, private router: Router) {}

  async ngOnInit() {
    this.asignaturaId = this.route.snapshot.queryParamMap.get('id') || '';

    const ref = collection(this.firestore, 'asistencias');
    const q = query(ref, where('asignaturaId', '==', this.asignaturaId));
    const snap = await getDocs(q);

    this.registros = snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        nombreCompleto: `${data['nombre']}_${data['seccion']}`
      };
    });
  }

  volver() {
    this.router.navigate(['/admin-registro-asistencia']);
  }
}
