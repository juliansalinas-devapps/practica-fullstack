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
  productoForm: FormGroup; // Define el formulario

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder // Inyecta FormBuilder
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
          this.productoForm.reset({ precio: 0, existencia: 0 });
          this.obtenerProductos();
        },
        error: (err) => {
          console.error(err);
          alert("Error al guardar: Verifique si el nombre ya existe.");
        }
      });
    }
  }
  toggleEstado(producto: any) {
    const nuevoEstado = !producto.activo;
    this.productoService.cambiarEstado(producto.id, nuevoEstado).subscribe(() => {
      this.obtenerProductos(); // Esto refresca la tabla automáticamente
    });
  }

  ajustarInventario(id: number) {
    const cantidad = prompt("Ingrese la cantidad a ajustar, numeros positivos para agregar, negativos para restar (ej 5 o -5):");
    const razon = prompt("Razón del ajuste:");

    if (cantidad && razon) {
      this.productoService.ajustarStock(id, Number(cantidad), razon).subscribe({
        next: () => this.obtenerProductos(),
        error: (err) => alert("Error: No se puede dejar el stock en negativo.") // Validación del PDF
      });
    }
  }
}
