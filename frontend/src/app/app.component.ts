import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from './services/producto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Importante para usar *ngFor
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  listaProductos: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe(data => {
      this.listaProductos = data;
      console.log(this.listaProductos); // Ver los datos en la consola del navegador
    });
  }
}
