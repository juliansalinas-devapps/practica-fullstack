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
  productoForm: FormGroup;
  productoEditandoId: number | null = null; // Controla si es edición o creación

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder
  ) {
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

  // --- LECTURA ---
  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe(data => {
      this.listaProductos = data;
    });
  }

  // --- CREACIÓN Y EDICIÓN ---
  prepararEdicion(producto: any) {
    this.productoEditandoId = producto.id; // Guardamos el ID para saber que vamos a editar
    this.productoForm.patchValue({
      nombre: producto.nombre,
      marca: producto.marca,
      categoria: producto.categoria,
      precio: producto.precio,
      existencia: producto.existencia
    });
  }

  guardarProducto() {
    if (this.productoForm.valid) {
      if (this.productoEditandoId) {
        // Lógica de Actualización (PUT)
        this.productoService.actualizarProducto(this.productoEditandoId, this.productoForm.value).subscribe(() => {
          this.finalizarOperacion("¡Producto actualizado con éxito!");
        });
      } else {
        // Lógica de Creación (POST)
        this.productoService.crearProducto(this.productoForm.value).subscribe(() => {
          this.finalizarOperacion("¡Producto creado con éxito!");
        });
      }
    }
  }

  finalizarOperacion(mensaje: string) {
    alert(mensaje);
    this.productoEditandoId = null; // Importante: Resetear el ID para que el siguiente sea creación
    this.productoForm.reset({ precio: 0, existencia: 0 });
    this.obtenerProductos(); // Refresca la tabla
  }

  // --- ACCIONES ADICIONALES ---
  toggleEstado(producto: any) {
    const nuevoEstado = !producto.activo;
    this.productoService.cambiarEstado(producto.id, nuevoEstado).subscribe(() => {
      this.obtenerProductos();
    });
  }

  ajustarInventario(id: number) {
    const cantidad = prompt("Ingrese la cantidad a ajustar, números positivos para añadir, números negativos para restar (ej. 5 o -5):");
    const razon = prompt("Razón del ajuste:");

    if (cantidad && razon) {
      this.productoService.ajustarStock(id, Number(cantidad), razon).subscribe({
        next: () => this.obtenerProductos(),
        error: (err) => alert("Error: No se puede dejar el stock en negativo.")
      });
    }
  }

  // --- ELIMINACIÓN ---
  borrarProducto(id: number) {
    if (confirm("¿Está seguro de eliminar este producto definitivamente de la base de datos?")) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.obtenerProductos();
      });
    }
  }
}
