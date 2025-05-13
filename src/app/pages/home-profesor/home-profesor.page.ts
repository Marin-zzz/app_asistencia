import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.page.html',
  styleUrls: ['./home-profesor.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomeProfesorPage implements OnInit {

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
