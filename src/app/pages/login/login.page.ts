import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { person } from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons({
  'person': person
});


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class LoginPage {
  form: FormGroup;
  error = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }

  async login() {
    if (this.form.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const { correo, contrasena } = this.form.value;
    console.log('Intentando login con:', correo);

    try {
      await this.authService.login(correo, contrasena);
      console.log('Login exitoso');
    } catch (err: any) {
      console.log('Error durante login:', err.message);
      this.error = err.message;
    }
  }

}
