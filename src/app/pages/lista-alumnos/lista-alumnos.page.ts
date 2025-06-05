import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline, qrCode, close, save } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { 
  Firestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  query, 
  where, 
  updateDoc 
} from '@angular/fire/firestore';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

addIcons({
  'arrow-back-outline': arrowBackOutline,
  'qr-code': qrCode,
  'close': close,
  'save': save
});

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.page.html',
  styleUrls: ['./lista-alumnos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZXingScannerModule
  ]
})
export class ListaAlumnosPage implements OnInit {
  asignaturaId: string = '';
  asignatura: any;
  alumnos: any[] = [];
  cargando: boolean = true;
  asistenciaDocId: string | null = null;
  profesorCorreo: string = '';
  
  escaneando: boolean = false;
  dispositivos: MediaDeviceInfo[] = [];
  dispositivoSeleccionado: MediaDeviceInfo | undefined;
  scannerHabilitado: boolean = false;
  formatosPermitidos: BarcodeFormat[] = [BarcodeFormat.QR_CODE];
  
  mensajeExito: string | null = null;
  mostrarMensaje: boolean = false;
  timeoutMensaje: any;
  
  ultimoQRLeido: string | null = null;
  tiempoUltimoQR: number = 0;
  readonly cooldownQR: number = 5000;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router,
    private alertCtrl: AlertController
  ) {}


  async ngOnInit() {
    this.limpiarDatos();
    this.route.queryParamMap.subscribe(async params => {
      this.asignaturaId = params.get('id') || '';
      await this.cargarDatosIniciales();
      this.cargando = false;
    });
}

  limpiarDatos() {
    this.asignaturaId = '';
    this.asignatura = null;
    this.alumnos = [];
    this.asistenciaDocId = null;
    this.cargando = true;
  }

  async cargarDatosIniciales() {
    const asigDoc = await getDoc(doc(this.firestore, 'asignaturas', this.asignaturaId));
    this.asignatura = asigDoc.data();
    this.profesorCorreo = localStorage.getItem('correo') || 'profesor@desconocido.cl';

    const ref = collection(this.firestore, 'asistencias');
    const q = query(ref, where('asignaturaId', '==', this.asignaturaId));
    const snap = await getDocs(q);

    if (snap.docs.length > 0) {
      const asistenciaDoc = snap.docs[0];
      this.asistenciaDocId = asistenciaDoc.id;
      this.alumnos = asistenciaDoc.data()['alumnos'];
    } else {
      this.alumnos = await this.crearListaInicial();
    }
  }

  async crearListaInicial(): Promise<any[]> {
    const lista: any[] = [];
    if (!this.asignatura?.alumnos) return lista;

    for (const rut of this.asignatura.alumnos) {
      const alumnoDoc = await getDoc(doc(this.firestore, 'usuarios', rut));
      if (alumnoDoc.exists()) {
        lista.push({
          rut,
          nombre: alumnoDoc.data()['nombre'],
          estado: 'ausente'
        });
      }
    }
    return lista;
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  cambiarEstado(index: number, nuevo: string) {
    this.alumnos[index].estado = nuevo;
  }

  async guardarAsistencia() {
    const fechaHoraChile = new Date().toLocaleString('es-CL', {
      timeZone: 'America/Santiago',
      hour12: false
    });

    if (!this.asistenciaDocId) {
      const ref = collection(this.firestore, 'asistencias');
      const snap = await getDocs(ref);
      const nuevoId = `registro_asistencia${snap.size + 1}`;

      const asistencia = {
        fechaCreacion: fechaHoraChile,
        fechaActualizacion: fechaHoraChile,
        asignaturaId: this.asignaturaId,
        nombre: this.asignatura.nombre,
        seccion: this.asignatura.seccion,
        profesor: this.profesorCorreo,
        alumnos: this.alumnos
      };

      await setDoc(doc(this.firestore, 'asistencias', nuevoId), asistencia);
      this.asistenciaDocId = nuevoId;

      await this.mostrarAlerta('Éxito', 'Asistencia guardada correctamente');
    } else {
      // Actualizar existente
      const asistenciaRef = doc(this.firestore, 'asistencias', this.asistenciaDocId);
      await updateDoc(asistenciaRef, {
        alumnos: this.alumnos,
        fechaActualizacion: fechaHoraChile,
        profesorActualizacion: this.profesorCorreo 
      });

      await this.mostrarAlerta('Éxito', 'Cambios guardados correctamente');
    }
  }

  volverHome() {
    this.router.navigate(['/profesor-home']);
  }

  async iniciarEscaneo() {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.dispositivos = devices.filter(device => device.kind === 'videoinput');
      
      if (this.dispositivos.length > 0) {
        this.dispositivoSeleccionado = this.dispositivos[0];
        this.escaneando = true;
        this.scannerHabilitado = true;
        this.ultimoQRLeido = null;
      } else {
        await this.mostrarAlerta('Error', 'No se encontraron cámaras disponibles');
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      await this.mostrarAlerta('Error', 'No se pudo acceder a la cámara');
    }
  }

  detenerEscaneo() {
    this.escaneando = false;
    this.scannerHabilitado = false;
    this.dispositivoSeleccionado = undefined;
    this.ocultarMensaje();
    this.ultimoQRLeido = null;
  }

  manejarScan(resultado: string) {
    const ahora = Date.now();
    
    if (this.ultimoQRLeido === resultado && (ahora - this.tiempoUltimoQR) < this.cooldownQR) {
      return;
    }

    try {
      const datos = JSON.parse(resultado);
      if (datos.asignaturaId === this.asignaturaId) {
        const alumnoIndex = this.alumnos.findIndex(a => a.rut === datos.rut);
        if (alumnoIndex !== -1) {
          this.alumnos[alumnoIndex].estado = 'presente';
          this.registrarQRLeido(resultado, ahora);
          this.mostrarMensajeTemporal(`Asistencia registrada para ${datos.nombre}`);
        }
      }
    } catch (e) {
      if (this.ultimoQRLeido !== resultado || (ahora - this.tiempoUltimoQR) >= this.cooldownQR) {
        this.registrarQRLeido(resultado, ahora);
        this.mostrarMensajeTemporal('QR no válido', true);
      }
    }
  }

  private registrarQRLeido(qr: string, timestamp: number) {
    this.ultimoQRLeido = qr;
    this.tiempoUltimoQR = timestamp;
  }

  mostrarMensajeTemporal(mensaje: string, esError: boolean = false) {
    this.ocultarMensaje();
    this.mensajeExito = mensaje;
    this.mostrarMensaje = true;
    
    this.timeoutMensaje = setTimeout(() => {
      this.ocultarMensaje();
    }, 2000);
  }

  ocultarMensaje() {
    this.mostrarMensaje = false;
    this.mensajeExito = null;
    if (this.timeoutMensaje) {
      clearTimeout(this.timeoutMensaje);
      this.timeoutMensaje = null;
    }
  }
}