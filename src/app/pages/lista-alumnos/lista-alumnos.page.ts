import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

import { ActivatedRoute } from '@angular/router';
import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc
} from '@angular/fire/firestore';


addIcons({
  'arrow-back-outline': arrowBackOutline
});

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.page.html',
  styleUrls: ['./lista-alumnos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ListaAlumnosPage implements OnInit {
  asignaturaId: string = '';
  asignatura: any;
  alumnos: any[] = [];
  cargando: boolean = true;
  asistenciaDocId: string | null = null;

  constructor(private route: ActivatedRoute, private firestore: Firestore,private router: Router) {}

  async ngOnInit() {
    this.asignaturaId = this.route.snapshot.queryParamMap.get('id') || '';

    // Obtengo datos asignatura
    const asigDoc = await getDoc(doc(this.firestore, 'asignaturas', this.asignaturaId));
    this.asignatura = asigDoc.data();

    // Busco si ya existe asistencia guardada para esta asignatura (sin importar fecha)
    const ref = collection(this.firestore, 'asistencias');
    const q = query(ref, where('asignaturaId', '==', this.asignaturaId));
    const snap = await getDocs(q);

    if (snap.docs.length > 0) {
      // Cargo la primera asistencia guardada para esta asignatura
      const asistenciaDoc = snap.docs[0];
      this.asistenciaDocId = asistenciaDoc.id;
      this.alumnos = asistenciaDoc.data()['alumnos'];
      console.log('✅ Asistencia cargada:', this.alumnos);
    } else {
      // Si no hay asistencia guardada, creo la lista desde asignatura con estado 'presente'
      const lista: any[] = [];
      for (const rut of this.asignatura.alumnos) {
        const alumnoDoc = await getDoc(doc(this.firestore, 'usuarios', rut));
        if (alumnoDoc.exists()) {
          const data = alumnoDoc.data();
          lista.push({
            rut,
            nombre: data['nombre'],
            estado: 'presente'
          });
        }
      }
      this.alumnos = lista;
      console.log('⚠️ No hay asistencia previa. Lista generada.');
    }

    this.cargando = false;
  }

  async cambiarEstado(index: number, nuevo: string) {
    this.alumnos[index].estado = nuevo;

    if (this.asistenciaDocId) {
      const fechaHoraChile = new Date().toLocaleString('es-CL', {
        timeZone: 'America/Santiago',
        hour12: false
      });

      const asistenciaRef = doc(this.firestore, 'asistencias', this.asistenciaDocId);
      await updateDoc(asistenciaRef, {
        alumnos: this.alumnos,
        fechaActualizacion: fechaHoraChile  // <-- nueva fecha de actualización
      });
      console.log('✅ Estado y fecha de actualización guardados en Firestore');
    }
  }

  async guardarAsistencia() {
    if (!this.asistenciaDocId) {
      // Creo documento por primera vez
      const fechaHoraChile = new Date().toLocaleString('es-CL', {
        timeZone: 'America/Santiago',
        hour12: false
      });

      const asistencia = {
        fechaCreacion: fechaHoraChile,
        asignaturaId: this.asignaturaId,
        nombre: this.asignatura.nombre,
        seccion: this.asignatura.seccion,
        profesor: this.asignatura.profesores[0],
        alumnos: this.alumnos
      };

      const docRef = await addDoc(collection(this.firestore, 'asistencias'), asistencia);
      this.asistenciaDocId = docRef.id;
      alert('✅ Asistencia guardada correctamente');
    } else {
      alert('✅ Todos los cambios ya están guardados automáticamente');
    }
  }
  
  volverHome() {
    this.router.navigate(['/profesor-home']);
  }
}
