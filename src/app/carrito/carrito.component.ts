import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartElement } from '@interfaces/cart-element.interface';
import { Session } from '@interfaces/detalle-evento.interface';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss',
})
export class CarritoComponent implements OnInit {
  products: CartElement[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.products = this.cartService.getProducts();
  }

  removeFromCart(id: number, dateSesion: number) {
    console.log(dateSesion);
    this.cartService.deleteProduct(id, dateSesion);
  }
}
