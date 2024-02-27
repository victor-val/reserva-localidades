import { Injectable } from '@angular/core';
import { CartElement } from '@interfaces/cart-element.interface';
import { Session } from '@interfaces/detalle-evento.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: CartElement[] = [];
  private products$ = new Subject<CartElement[]>();

  addProduct(id: number, title: string, sesion: Session) {
    if (sesion.availability === 0) return;
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      this.products.push({
        id,
        title,
        sessions: [{ dateSession: sesion.date, seatsSelected: 1 }],
      });
    } else {
      const sesionSel = product.sessions.find(
        (s) => s.dateSession === sesion.date
      );
      if (sesionSel) {
        if (sesion.availability >= sesionSel.seatsSelected + 1)
          sesionSel.seatsSelected = sesionSel.seatsSelected + 1;
      } else {
        product.sessions.push({ dateSession: sesion.date, seatsSelected: 1 });
        product.sessions.sort((a, b) => a.dateSession - b.dateSession);
      }
    }
    this.products$.next(this.products);
  }

  deleteProduct(id: number, dateSesion: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      return;
    }
    const sesionSelected = product.sessions.find(
      (s) => s.dateSession === dateSesion
    );
    if (!sesionSelected) {
      return;
    }
    sesionSelected.seatsSelected -= 1;
    if (sesionSelected.seatsSelected === 0) {
      product.sessions = product.sessions.filter(
        (s) => s.dateSession !== dateSesion
      );
      if (product.sessions.length === 0) {
        this.products = this.products.filter((product) => product.id !== id);
      }
    }
    this.products$.next(this.products);
  }

  getProducts(): CartElement[] {
    return this.products;
  }

  getProducts$(): Observable<CartElement[]> {
    return this.products$.asObservable();
  }

  getSeatsSelected(id: number, dateSesion: number): number {
    const product = this.products.find((p) => p.id === id);
    if (!product) return 0;
    const sesionSelected = product.sessions.find(
      (s) => s.dateSession === dateSesion
    );
    if (!sesionSelected) return 0;
    return sesionSelected.seatsSelected;
  }
}
