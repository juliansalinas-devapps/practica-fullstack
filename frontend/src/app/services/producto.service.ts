import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // URL de la API en Spring Boot
  private apiUrl = 'http://localhost:8080/productos';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los productos de MySQL
  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
crearProducto(producto: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, producto);
}

// Método para activar/desactivar
cambiarEstado(id: number, activo: boolean): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${id}/estado?activo=${activo}`, {});
}

// Método para ajustar stock (Suma o Resta)
ajustarStock(id: number, cantidad: number, razon: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${id}/ajuste?cantidad=${cantidad}&razon=${razon}`, {});
}

}
