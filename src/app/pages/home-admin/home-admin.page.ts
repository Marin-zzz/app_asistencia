import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomeAdminPage implements OnInit {

  constructor(private authService: AuthService) { }
  
  logout() {
    this.authService.logout();
  }

  nombre: string = '';
  tipo: string = '';

  ngOnInit() {
  this.nombre = localStorage.getItem('nombre') || '';
  this.tipo = localStorage.getItem('tipo') || '';    
  }
}