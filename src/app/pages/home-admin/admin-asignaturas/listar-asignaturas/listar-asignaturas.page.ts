import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { Firestore, collection, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-asignaturas',
  templateUrl: './listar-asignaturas.page.html',
  styleUrls: ['./listar-asignaturas.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ListarAsignaturasPage implements OnInit, OnDestroy {

  asignaturas: any[] = [];
  private asignaturasSub: Subscription | undefined;

  constructor(
    private firestore: Firestore,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const asignaturasRef = collection(this.firestore, 'asignaturas');
    this.asignaturasSub = collectionData(asignaturasRef, { idField: 'id' }).subscribe(data => {
      this.asignaturas = data;
    });
  }

  ngOnDestroy() {
    this.asignaturasSub?.unsubscribe();
  }

  editarAsignatura(id: string) {
    this.router.navigate(['/editar-asignatura', id]);
  }

  async eliminarAsignatura(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro que deseas eliminar esta asignatura?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Eliminar', 
          handler: async () => {
            try {
              await deleteDoc(doc(this.firestore, 'asignaturas', id));
              const toast = await this.toastCtrl.create({
                message: 'Asignatura eliminada',
                duration: 2000,
                color: 'success'
              });
              await toast.present();
              // No hace falta llamar cargarAsignaturas porque el observable actualiza
            } catch (error) {
              console.error('Error eliminando asignatura:', error);
              const toast = await this.toastCtrl.create({
                message: 'Error al eliminar asignatura',
                duration: 2000,
                color: 'danger'
              });
              await toast.present();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  crearAsignatura() {
    this.router.navigate(['/crear-asignatura']);
  }

  volver() {
    this.router.navigate(['/admin-asignaturas']);
  }
}
