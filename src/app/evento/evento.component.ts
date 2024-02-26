import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Evento } from '../interfaces/evento.interface';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.scss',
})
export class EventoComponent {
  @Input() evento!: Evento;

}
