import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CartElement } from '@interfaces/cart-element.interface';
import { CartService } from '@services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoComponent implements OnInit {
  products: CartElement[] = [];
  products$!: Observable<CartElement[]>;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.products$ = this.cartService.getProducts$();
    this.products$.subscribe((products) => {
      this.products = products;
      this.cdr.detectChanges();
    });
  }

  removeFromCart(id: number, dateSesion: number) {
    console.log(dateSesion);
    this.cartService.deleteProduct(id, dateSesion);
  }
}
