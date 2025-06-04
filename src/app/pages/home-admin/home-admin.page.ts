import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomeAdminPage implements OnInit {

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
  }

  nombre: string = '';
  tipo: string = '';

  usuario = {
    rut: '',
    nombre: '',
    correo: '',
    contrasena: '',
    tipo: ''
  };

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre') || '';
    this.tipo = localStorage.getItem('tipo') || '';    
  }

  async agregarUsuario() {
    const { rut, nombre, correo, contrasena, tipo } = this.usuario;

    if (!rut || !nombre || !correo || !contrasena || !tipo) {
      await this.mostrarAlerta('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const usuarioRef = doc(this.firestore, 'usuarios', rut);
      await setDoc(usuarioRef, {
        rut,
        nombre,
        correo,
        contrasena,
        tipo
      });

      await this.mostrarAlerta('Éxito', 'Usuario agregado correctamente');
      this.usuario = { rut: '', nombre: '', correo: '', contrasena: '', tipo: '' };
    } catch (error) {
      await this.mostrarAlerta('Error', 'No se pudo agregar el usuario');
      console.error(error);
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

  irAUsuarios() {
    this.router.navigate(['/admin-usuarios']);
  }

  irAAsignaturas() {
    this.router.navigate(['/admin-asignaturas']);
  }

  irARegistroAsignaturas() {
    this.router.navigate(['/']);
  }  
}
