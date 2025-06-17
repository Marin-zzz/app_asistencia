import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { Firestore, collection, getDocs, doc, deleteDoc, query, where, updateDoc, arrayRemove } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-listar-usuarios',
  templateUrl: './admin-listar-usuarios.page.html',
  styleUrls: ['./admin-listar-usuarios.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class AdminListarUsuariosPage implements OnInit {
  usuarios: any[] = [];
  cargando = true;

  constructor(private firestore: Firestore, private alertCtrl: AlertController, private router: Router) {}

  async ngOnInit() {
    await this.cargarUsuarios();
  }

  async cargarUsuarios() {
    this.cargando = true;
    const usuariosCol = collection(this.firestore, 'usuarios');
    const snapshot = await getDocs(usuariosCol);

    this.usuarios = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    this.cargando = false;
  }

  async eliminarUsuario(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Eliminar este usuario?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await deleteDoc(doc(this.firestore, 'usuarios', id));

            const asignaturasRef = collection(this.firestore, 'asignaturas');
            const q = query(asignaturasRef, where('alumnos', 'array-contains', id));
            const snapshot = await getDocs(q);

            const promesas = snapshot.docs.map(async (asigDoc) => {
              const asigRef = doc(this.firestore, 'asignaturas', asigDoc.id);
              await updateDoc(asigRef, {
                alumnos: arrayRemove(id)
              });
            });

            await Promise.all(promesas);

            this.cargarUsuarios();
          }
        }
      ]
    });

    await alert.present();
  }

  editarUsuario(usuario: any) {
    localStorage.setItem('usuarioEditar', JSON.stringify(usuario));
    this.router.navigate(['/admin-editar-usuario']);
  }

  volver() {
    this.router.navigate(['/admin-usuarios']);
  }
}
