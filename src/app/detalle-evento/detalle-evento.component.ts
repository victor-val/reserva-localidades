import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarritoComponent } from '../carrito/carrito.component';
import { EventsService } from '@services/events.service';
import { CommonModule } from '@angular/common';
import {
  DetalleEvento,
  DetalleEventoResponse,
  Session,
} from '@interfaces/detalle-evento.interface';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule, RouterModule, CarritoComponent],
  templateUrl: './detalle-evento.component.html',
  styleUrl: './detalle-evento.component.scss',
})
export class DetalleEventoComponent implements OnInit, OnDestroy {
  id!: number;
  subscriptions: Subscription[] = [];
  detalle!: DetalleEvento;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const sub = this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.getEventInfo();
    });
    this.subscriptions.push(sub);
  }

  getEventInfo() {
    const sub = this.eventsService
      .getEventInfo(this.id)
      .subscribe(({ event, sessions }: DetalleEventoResponse) => {
        this.detalle = { id: event.id, title: event.title, sessions };
        this.detalle.sessions.sort((a, b) => a.date - b.date);
      });
    this.subscriptions.push(sub);
  }

  getSeatsSelected(id: number, dateSesion: number): number {
    return this.cartService.getSeatsSelected(id, dateSesion);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addToCart(id: number, title: string, sesion: Session) {
    this.cartService.addProduct(id, title, sesion);
  }

  removeFromCart(id: number, dateSesion: number) {
    this.cartService.deleteProduct(id, dateSesion);
  }
}
