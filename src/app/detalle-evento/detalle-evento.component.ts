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
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    const sub = this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.getDetail();
    });
    this.subscriptions.push(sub);
  }

  getDetail() {
    const sub = this.eventsService
      .getEventDetail(this.id)
      .subscribe(({ event, sessions }: DetalleEventoResponse) => {
        this.detalle = { title: event.title, sessions };
        console.log(this.detalle);
      });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  dispo(sesion: Session) {
    console.log('dispo');
    console.log(sesion);
  }
}
