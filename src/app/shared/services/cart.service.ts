import { Injectable } from '@angular/core';
import { CartElement } from '../interfaces/cart-element.interface';
import { BehaviorSubject, Observable, map, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products$ = new BehaviorSubject<CartElement[]>([]);

  constructor() {
    const prod = sessionStorage.getItem('productos');
    if (prod !== 'undefined') {
      const productsSession: CartElement[] = JSON.parse(prod!);
      if (productsSession) {
        this.products$.next(productsSession);
      }
    }

    this.getProducts$().subscribe((products) => {
      sessionStorage.setItem('productos', JSON.stringify(products));
    });
  }

  addProduct(
    id: number,
    title: string,
    sesion: number
  ): Observable<CartElement> {
    let product: CartElement | undefined;
    const productos: CartElement[] = this.products$.getValue();
    product = productos.find((product) => product.id === id || null);
    if (!product) {
      product = {
        id,
        title,
        sessions: [{ dateSession: sesion, seatsSelected: 1 }],
      };
      productos.push(product);
    } else {
      const sesionSel = product.sessions.find((s) => s.dateSession === sesion);
      if (sesionSel) {
        sesionSel.seatsSelected = sesionSel.seatsSelected + 1;
      } else {
        product.sessions.push({ dateSession: sesion, seatsSelected: 1 });
        product.sessions.sort((a, b) => a.dateSession - b.dateSession);
      }
    }

    return timer(1000).pipe(
      tap(() => this.products$.next(productos)),
      map(() => product!)
    );
  }

  deleteProduct(id: number, dateSesion: number) {
    let productos: CartElement[] = this.products$.getValue();
    const product: CartElement | undefined = productos.find(
      (product) => product.id === id || null
    );
    if (!product) return;
    const sesionSelected = product.sessions.find(
      (s) => s.dateSession === dateSesion
    );
    if (!sesionSelected) return;
    sesionSelected.seatsSelected -= 1;
    if (sesionSelected.seatsSelected === 0) {
      product.sessions = product.sessions.filter(
        (s) => s.dateSession !== dateSesion
      );
      if (product.sessions.length === 0) {
        productos = productos.filter((product) => product.id !== id);
      }
    }
    this.products$.next(productos);
  }

  getProducts$(): Observable<CartElement[]> {
    return this.products$.asObservable();
  }

  getSeatsSelected(id: number, dateSesion: number): number {
    const productos: CartElement[] = this.products$.getValue();
    const product: CartElement | undefined = productos.find(
      (product) => product.id === id || null
    );
    if (!product) return 0;
    const sesionSelected = product.sessions.find(
      (s) => s.dateSession === dateSesion
    );
    if (!sesionSelected) return 0;
    return sesionSelected.seatsSelected;
  }
}
