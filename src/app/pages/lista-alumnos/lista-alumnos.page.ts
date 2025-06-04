import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
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
  updateDoc
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

  profesorCorreo: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    this.asignaturaId = this.route.snapshot.queryParamMap.get('id') || '';

    const asigDoc = await getDoc(doc(this.firestore, 'asignaturas', this.asignaturaId));
    this.asignatura = asigDoc.data();

    const correoGuardado = localStorage.getItem('correo');
    this.profesorCorreo = correoGuardado || 'profesor@desconocido.cl';

    const ref = collection(this.firestore, 'asistencias');
    const q = query(ref, where('asignaturaId', '==', this.asignaturaId));
    const snap = await getDocs(q);

    if (snap.docs.length > 0) {
      const asistenciaDoc = snap.docs[0];
      this.asistenciaDocId = asistenciaDoc.id;
      this.alumnos = asistenciaDoc.data()['alumnos'];

      for (const rut of this.asignatura.alumnos) {
        const yaExiste = this.alumnos.some((a) => a.rut === rut);
        if (!yaExiste) {
          const alumnoDoc = await getDoc(doc(this.firestore, 'usuarios', rut));
          if (alumnoDoc.exists()) {
            const data = alumnoDoc.data();
            this.alumnos.push({
              rut,
              nombre: data['nombre'],
              estado: 'presente'
            });
          }
        }
      }
    } else {
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
    }

    this.cargando = false;
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  cambiarEstado(index: number, nuevo: string) {
    this.alumnos[index].estado = nuevo;
  }

  async guardarAsistencia() {
    const fechaHoraChile = new Date().toLocaleString('es-CL', {
      timeZone: 'America/Santiago',
      hour12: false
    });

    if (!this.asistenciaDocId) {
      const ref = collection(this.firestore, 'asistencias');
      const snap = await getDocs(ref);
      const nuevoId = `registro_asistencia${snap.size + 1}`;

      const asistencia = {
        fechaCreacion: fechaHoraChile,
        fechaActualizacion: fechaHoraChile,
        asignaturaId: this.asignaturaId,
        nombre: this.asignatura.nombre,
        seccion: this.asignatura.seccion,
        profesor: this.profesorCorreo,
        alumnos: this.alumnos
      };

      await setDoc(doc(this.firestore, 'asistencias', nuevoId), asistencia);
      this.asistenciaDocId = nuevoId;

      await this.mostrarAlerta('Éxito', 'Asistencia guardada correctamente');
    } else {
      // Actualizar existente
      const asistenciaRef = doc(this.firestore, 'asistencias', this.asistenciaDocId);
      await updateDoc(asistenciaRef, {
        alumnos: this.alumnos,
        fechaActualizacion: fechaHoraChile,
        profesorActualizacion: this.profesorCorreo 
      });

      await this.mostrarAlerta('Éxito', 'Cambios guardados correctamente');
    }
  }

  volverHome() {
    this.router.navigate(['/profesor-home']);
  }
}
