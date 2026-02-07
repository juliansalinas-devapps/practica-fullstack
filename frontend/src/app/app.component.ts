import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from './services/producto.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  listaProductos: any[] = [];
  productoForm: FormGroup; // <--- Define el formulario

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder // <--- Inyecta FormBuilder
  ) {
    // Inicializa los campos con validaciones básicas
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      existencia: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe(data => {
      this.listaProductos = data;
    });
  }

  guardarProducto() {
    if (this.productoForm.valid) {
      this.productoService.crearProducto(this.productoForm.value).subscribe({
        next: (res) => {
          alert("¡Producto guardado con éxito!");
          this.productoForm.reset({ precio: 0, existencia: 0 }); // Limpia formulario
          this.obtenerProductos(); // Refresca la tabla automáticamente
        },
        error: (err) => {
          console.error(err);
          alert("Error al guardar: Verifique si el nombre ya existe.");
        }
      });
    }
  }
}
