import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-admin-crear-usuario',
  templateUrl: './admin-crear-usuario.page.html',
  styleUrls: ['./admin-crear-usuario.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AdminCrearUsuarioPage {
  rut: string = '';
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  tipo: string = '';

  constructor(
    private firestore: Firestore,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService
  ) {}

  async crearUsuario() {
    if (!this.rut || !this.nombre || !this.correo || !this.tipo || !this.contrasena) {
      const alerta = await this.alertCtrl.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios',
        buttons: ['OK']
      });
      return await alerta.present();
    }

    const docRef = doc(this.firestore, 'usuarios', this.rut);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const alerta = await this.alertCtrl.create({
        header: 'Error',
        message: 'El usuario ya existe',
        buttons: ['OK']
      });
      return await alerta.present();
    }

    const hash = await this.authService.hashPassword(this.contrasena);

    await setDoc(docRef, {
      nombre: this.nombre,
      correo: this.correo,
      tipo: this.tipo,
      contrasena: hash
    });

    const alerta = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Usuario creado correctamente',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/admin-usuarios']);
          }
        }
      ]
    });

    await alerta.present();
  }

  volver() {
    this.router.navigate(['/admin-usuarios']);
  }

}
