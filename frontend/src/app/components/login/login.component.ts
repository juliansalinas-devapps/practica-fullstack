import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  // Importamos FormsModule para que funcione el [(ngModel)] en el HTML
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    // Simulación de validación requerida por la practica
    if (this.usuario === 'admin' && this.password === '1234') {
      alert('¡Bienvenido al Sistema de Inventarios!');
      // Por ahora, como no tenemos rutas configuradas,
      // usaremos una técnica sencilla para mostrar la tabla.
      localStorage.setItem('auth', 'true');
      location.reload(); // Recargamos para que el App Component detecte el cambio
    } else {
      alert('Credenciales incorrectas. Intente con admin / 1234');
    }
  }
}
