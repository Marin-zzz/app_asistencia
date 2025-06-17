import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.page.html',
  styleUrls: ['./admin-usuarios.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class AdminUsuariosPage {

  constructor(private router: Router) {}

  crearUsuario() {
    this.router.navigate(['/admin-crear-usuario']);
  }

  listarUsuarios() {
    this.router.navigate(['/admin-listar-usuarios']);
  }

  volver() {
    this.router.navigate(['/admin-home']);
  }
}
