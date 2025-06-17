import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Firestore, collection, getDocs, addDoc, query, where, doc, updateDoc,setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-asignatura',
  templateUrl: './crear-asignatura.page.html',
  styleUrls: ['./crear-asignatura.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class CrearAsignaturaPage implements OnInit {

  nombre: string = '';
  dia: string = '';
  horario: string = '';
  seccion: string = '';

  alumnosDisponibles: any[] = [];  // Lista con {rut, nombre} de alumnos
  profesoresDisponibles: any[] = []; // Lista con {correo, nombre}

  alumnosSeleccionados: string[] = [];  // Array de rut
  profesoresSeleccionados: string[] = []; // Array de correo

  constructor(
    private firestore: Firestore,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    // Cargar alumnos (usuarios con tipo 'alumno')
    const usuariosRef = collection(this.firestore, 'usuarios');
    const qAlumnos = query(usuariosRef, where('tipo', '==', 'alumno'));
    const snapAlumnos = await getDocs(qAlumnos);
    this.alumnosDisponibles = snapAlumnos.docs.map(doc => ({
      rut: doc.id,
      nombre: doc.data()['nombre']
    }));

    // Cargar profesores (usuarios con tipo 'profesor')
    const qProfesores = query(usuariosRef, where('tipo', '==', 'profesor'));
    const snapProfesores = await getDocs(qProfesores);
    this.profesoresDisponibles = snapProfesores.docs.map(doc => ({
      correo: doc.data()['correo'],
      nombre: doc.data()['nombre']
    }));
  }

  async crearAsignatura() {
    if (!this.nombre || !this.dia || !this.horario) {
      this.mostrarAlerta('Faltan datos', 'Por favor, completa todos los campos.');
      return;
    }

    const asignaturasRef = collection(this.firestore, 'asignaturas');

    // 1. Buscar asignaturas que tengan el mismo nombre
    const q = query(asignaturasRef, where('nombre', '==', this.nombre));
    const querySnapshot = await getDocs(q);

    // 2. Calcular la sección en base a la cantidad que ya hay
    const cantidad = querySnapshot.size;
    const seccionNum = cantidad + 1;
    this.seccion = seccionNum.toString().padStart(3, '0') + 'D';

    // 3. Conseguir el último id para mantener la numeración secuencial de asignaturaX
    const snapAsignaturas = await getDocs(asignaturasRef);
    let maxId = 0;
    snapAsignaturas.forEach(doc => {
      const idNum = parseInt(doc.id.replace('asignatura', ''), 10);
      if (!isNaN(idNum) && idNum > maxId) maxId = idNum;
    });
    const nuevoId = 'asignatura' + (maxId + 1);

    // 4. Crear el objeto de la nueva asignatura
    const nuevaAsignatura = {
      nombre: this.nombre,
      dia: this.dia,
      horario: this.horario,
      seccion: this.seccion,
      alumnos: this.alumnosSeleccionados,
      profesores: this.profesoresSeleccionados
    };

    try {
      await setDoc(doc(this.firestore, 'asignaturas', nuevoId), nuevaAsignatura);
      await this.mostrarAlerta('Éxito', 'Asignatura creada correctamente');
      this.router.navigate(['/admin-asignaturas']);
    } catch (error) {
      console.error('Error creando asignatura:', error);
      this.mostrarAlerta('Error', 'No se pudo crear la asignatura');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  cancelar() {
    this.router.navigate(['/admin-asignaturas']);
  }

  volver() {
    this.router.navigate(['/admin-asignaturas']);
  }
}
