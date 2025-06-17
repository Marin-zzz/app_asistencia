import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, doc, getDoc, updateDoc, collection, getDocs } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-editar-asignatura',
  templateUrl: './editar-asignatura.page.html',
  styleUrls: ['./editar-asignatura.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class EditarAsignaturaPage implements OnInit {
  id: string = '';
  nombre: string = '';
  dia: string = '';
  horario: string = '';
  seccion: string = '';
  
  // Alumnos
  alumnos: string[] = [];
  alumnosPlaceholder: string = 'Seleccionar alumnos';
  mostrarListaAlumnos: boolean = false;
  alumnosSeleccionados: { [rut: string]: boolean } = {};
  listaAlumnos: { rut: string; nombre: string }[] = [];
  
  // Profesores
  profesores: string[] = [];
  profesoresPlaceholder: string = 'Seleccionar profesores';
  mostrarListaProfesores: boolean = false;
  profesoresSeleccionados: { [correo: string]: boolean } = {};
  listaProfesores: { correo: string; nombre?: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    const docRef = doc(this.firestore, `asignaturas/${this.id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data: any = docSnap.data();
      this.nombre = data.nombre;
      this.dia = data.dia;
      this.horario = data.horario;
      this.seccion = data.seccion;
      this.alumnos = data.alumnos || [];
      this.profesores = data.profesores || [];
      
      // Inicializar selecciones
      this.alumnos.forEach(rut => this.alumnosSeleccionados[rut] = true);
      this.profesores.forEach(correo => this.profesoresSeleccionados[correo] = true);
    }

    await this.cargarUsuarios();
    this.actualizarPlaceholders();
  }

  async cargarUsuarios() {
    this.listaAlumnos = [];
    this.listaProfesores = [];

    const usuariosRef = collection(this.firestore, 'usuarios');
    const snapshot = await getDocs(usuariosRef);

    snapshot.forEach((docSnap) => {
      const data: any = docSnap.data();
      if (data.tipo === 'alumno') {
        this.listaAlumnos.push({ rut: docSnap.id, nombre: data.nombre });
      } else if (data.tipo === 'profesor' && data.correo) {
        this.listaProfesores.push({ correo: data.correo, nombre: data.nombre });
      }
    });
  }

  actualizarPlaceholders() {
    this.alumnosPlaceholder = this.alumnos.length > 0 ? 'Alumnos seleccionados' : 'Seleccionar alumnos';
    this.profesoresPlaceholder = this.profesores.length > 0 ? 'Profesor(es) seleccionado(s)' : 'Seleccionar profesores';
  }

  toggleAlumnoSeleccionado(rut: string) {
    this.alumnosSeleccionados[rut] = !this.alumnosSeleccionados[rut];
    this.alumnos = Object.keys(this.alumnosSeleccionados).filter(rut => this.alumnosSeleccionados[rut]);
    this.actualizarPlaceholders();
  }

  toggleProfesorSeleccionado(correo: string) {
    this.profesoresSeleccionados[correo] = !this.profesoresSeleccionados[correo];
    this.profesores = Object.keys(this.profesoresSeleccionados).filter(correo => this.profesoresSeleccionados[correo]);
    this.actualizarPlaceholders();
  }

  async guardarCambios() {
    const docRef = doc(this.firestore, `asignaturas/${this.id}`);
    await updateDoc(docRef, {
      nombre: this.nombre,
      dia: this.dia,
      horario: this.horario,
      seccion: this.seccion,
      alumnos: this.alumnos,
      profesores: this.profesores
    });

    this.mostrarListaAlumnos = false;
    this.mostrarListaProfesores = false;

    const alert = await this.alertController.create({
      header: 'Asignatura Actualizada',
      message: 'Los cambios se han guardado correctamente.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/admin-asignaturas']);
        }
      }]
    });

    await alert.present();
  }

  volver() {
    this.router.navigate(['/admin-asignaturas']);
  }

  obtenerNombreProfesor(correo: string): string {
    const profesor = this.listaProfesores.find(p => p.correo === correo);
    return profesor?.nombre || correo.split('@')[0];
  }
}