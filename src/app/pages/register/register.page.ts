import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
    imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class RegisterPage {
  form: FormGroup;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      rut: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      tipo: ['alumno', Validators.required],
      nombre: ['', Validators.required] 
    });
  }

    async registrar() {
      if (this.form.invalid) return;

      const { rut, correo, contrasena, tipo, nombre } = this.form.value;

      try {
        await this.authService.register(rut, correo, contrasena, tipo, nombre);
        this.router.navigate(['/login']);
      } catch (err: any) {
        this.error = err.message;
      }
    }

}
