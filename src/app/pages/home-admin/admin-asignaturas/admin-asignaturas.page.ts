import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-asignaturas',
  templateUrl: './admin-asignaturas.page.html',
  styleUrls: ['./admin-asignaturas.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class AdminAsignaturasPage {

  constructor(private router: Router) {}

  irACrearAsignatura() {
    this.router.navigate(['/crear-asignatura']);
  }

  irAListarAsignaturas() {
    this.router.navigate(['/listar-asignaturas']);
  }

  volver() {
    this.router.navigate(['/admin-home']);
  }
}
