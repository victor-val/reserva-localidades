import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Evento } from '@interfaces/evento.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.scss',
})
export class EventoComponent {
  @Input() evento!: Evento;

  constructor(private router: Router){}
  goToDetail(){
    this.router.navigate(['/detalle-evento/', this.evento.id]);
  }
}
