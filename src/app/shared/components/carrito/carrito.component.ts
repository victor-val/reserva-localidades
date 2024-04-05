import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CartElement } from '../../interfaces/cart-element.interface';
import { CartService } from '../../services/cart.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoComponent implements OnInit, OnDestroy {
  products: CartElement[] = [];
  products$!: Observable<CartElement[]>;
  subscription!: Subscription;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.products$ = this.cartService.getProducts$();
    /*     this.subscription = this.products$.subscribe((products) => {
      this.products = products;
      this.cdr.detectChanges();
    }); */
  }

  removeFromCart(id: number, dateSesion: number) {
    this.cartService.deleteProduct(id, dateSesion);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
