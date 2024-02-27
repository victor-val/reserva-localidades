import { Injectable } from '@angular/core';
import { CartElement } from '@interfaces/cart-element.interface';
import { Session } from '@interfaces/detalle-evento.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: CartElement[] = [];

  addProduct(id: number, title: string, sesion: Session) {
    if (sesion.availability === 0) return;
    const product = this.products.find((p) => p.id === id);
    console.log(product);
    if (!product) {
      this.products.push({
        id,
        title,
        sessions: [{ dateSession: sesion.date, seatsSelected: 1 }],
      });
      return;
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

    console.log(this.products);
  }

  deleteProduct(id: number, dateSesion: number) {
    console.log('deleteProduct', id, dateSesion);
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      return;
    }
    console.log('deleteProduct', product);
    const sesionSelected = product.sessions.find(
      (s) => s.dateSession === dateSesion
    );
    if (!sesionSelected) {
      return;
    }
    console.log('deleteProduct', sesionSelected);
    sesionSelected.seatsSelected -= 1;
    if (sesionSelected.seatsSelected === 0) {
      product.sessions = product.sessions.filter(
        (s) => s.dateSession !== dateSesion
      );
      console.log(product.sessions.length);
      if (product.sessions.length === 0) {
        this.products = this.products.filter((product) => product.id !== id);
      }
      console.log(this.products);
    }
  }

  getProducts(): CartElement[] {
    return this.products;
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
