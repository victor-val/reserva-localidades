import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { EventoComponent } from '../evento/evento.component';
import { EventsService } from '@services/events.service';
import { Evento } from '@interfaces/evento.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cartelera',
  standalone: true,
  imports: [CommonModule, MatCardModule, EventoComponent],
  templateUrl: './cartelera.component.html',
  styleUrl: './cartelera.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarteleraComponent implements OnInit, OnDestroy {
  eventos: Evento[] = [];
  subs!: Subscription;
  constructor(
    private eventsService: EventsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subs = this.eventsService.getEvents().subscribe((events) => {
      this.eventos = events;
      this.eventos.sort((a, b) => a.endDate - b.endDate);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
