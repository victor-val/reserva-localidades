import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [],
  templateUrl: './detalle-evento.component.html',
  styleUrl: './detalle-evento.component.scss',
})
export class DetalleEventoComponent implements OnInit, OnDestroy {
  id!: number;
  subs!: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subs = this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    });
    console.log(this.id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
