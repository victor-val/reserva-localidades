import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarritoComponent } from '@shared/components/carrito/carrito.component';
import { CartService } from '@shared/services/cart.service';
import { EventsService } from '@services/events.service';
import { CommonModule } from '@angular/common';
import {
  DetalleEvento,
  DetalleEventoResponse,
  Session,
} from '@interfaces/detalle-evento.interface';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule, RouterModule, CarritoComponent],
  templateUrl: './detalle-evento.component.html',
  styleUrl: './detalle-evento.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleEventoComponent implements OnInit, OnDestroy {
  id!: number;
  subscriptions: Subscription[] = [];
  detalle!: DetalleEvento;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
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
        this.cdr.detectChanges();
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
    if (sesion.availability === 0) return;
    const seatsSelected = this.getSeatsSelected(id, sesion.date);
    if (sesion.availability >= seatsSelected + 1)
      this.cartService.addProduct(id, title, sesion.date);
  }

  removeFromCart(id: number, dateSesion: number) {
    this.cartService.deleteProduct(id, dateSesion);
  }
}
