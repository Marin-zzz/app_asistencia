import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-editar-usuario',
  templateUrl: './admin-editar-usuario.page.html',
  styleUrls: ['./admin-editar-usuario.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AdminEditarUsuarioPage implements OnInit {

  usuario: any = {
    id: '',
    nombre: '',
    correo: '',
    tipo: ''
  };

  constructor(private firestore: Firestore, private alertCtrl: AlertController, private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('usuarioEditar');
    if (data) {
      this.usuario = JSON.parse(data);
    }
  }

  async guardarCambios() {
    const ref = doc(this.firestore, 'usuarios', this.usuario.id);
    await updateDoc(ref, {
      nombre: this.usuario.nombre,
      correo: this.usuario.correo,
      tipo: this.usuario.tipo
    });

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Usuario actualizado correctamente',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/admin-listar-usuarios']);
          }
        }
      ]
    });

    await alert.present();
  }
}
