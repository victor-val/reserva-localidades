import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { EventoComponent } from '../evento/evento.component';

@Component({
  selector: 'app-cartelera',
  standalone: true,
  imports: [CommonModule, MatCardModule, EventoComponent],
  templateUrl: './cartelera.component.html',
  styleUrl: './cartelera.component.scss',
})
export class CarteleraComponent {}
