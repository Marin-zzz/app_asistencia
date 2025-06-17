import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firestore: Firestore,
    private router: Router
  ) {}

  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async register(rut: string, correo: string, contrasena: string, tipo: string, nombre: string) {
    const userRef = doc(this.firestore, `usuarios/${rut}`);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      throw new Error('El RUT ya está registrado');
    }

    const hashedPassword = await this.hashPassword(contrasena);

    await setDoc(userRef, {
      rut,
      correo,
      contrasena: hashedPassword,
      tipo,
      nombre
    });

    return true;
  }

async login(correo: string, contrasena: string) {
  console.log('Buscando usuario con correo:', correo);

  const usuariosRef = collection(this.firestore, 'usuarios');
  const q = query(usuariosRef, where('correo', '==', correo));
  const snap = await getDocs(q);

  if (snap.empty) {
    console.log('No se encontró el usuario');
    throw new Error('Usuario no encontrado');
  }

  const docSnap = snap.docs[0];
  const data: any = docSnap.data();
  console.log('Usuario encontrado:', data);

  const hashed = await this.hashPassword(contrasena);
  console.log('Hash ingresado:', hashed);
  console.log('Hash almacenado:', data.contrasena);

  if (data.contrasena !== hashed) {
    console.log('Contraseña incorrecta');
    throw new Error('Contraseña incorrecta');
  }

  
  localStorage.setItem('rut', docSnap.id);
  localStorage.setItem('nombre', data.nombre);
  localStorage.setItem('tipo', data.tipo);
  localStorage.setItem('correo', data.correo);

  console.log('Redirigiendo según tipo:', data.tipo);

  switch (data.tipo) {
    case 'administrador':
      this.router.navigate(['/admin-home']);
      break;
    case 'profesor':
      this.router.navigate(['/profesor-home']);
      break;
    case 'alumno':
      this.router.navigate(['/alumno-home']);
      break;
    default:
      throw new Error('Tipo de usuario no válido');
  }
}



  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

