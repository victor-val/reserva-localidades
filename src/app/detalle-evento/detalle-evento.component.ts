import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarritoComponent } from '../carrito/carrito.component';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [RouterModule, CarritoComponent],
  templateUrl: './detalle-evento.component.html',
  styleUrl: './detalle-evento.component.scss',
})
export class DetalleEventoComponent implements OnInit, OnDestroy {
  id!: number;
  subs!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.subs = this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.getDetail();
    });
  }

  getDetail() {
    this.eventsService.getEventDetail(this.id).subscribe((detalle) => {
      console.log(detalle);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
