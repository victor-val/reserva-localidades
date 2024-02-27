import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '@interfaces/evento.interface';
import { DetalleEventoResponse } from '@interfaces/detalle-evento.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getEvents(): Observable<Array<Evento>> {
    return this.http.get<Array<Evento>>(this.url + '/events');
  }

  getEventInfo(id: number): Observable<DetalleEventoResponse> {
    return this.http.get<DetalleEventoResponse>(this.url + '/event_info_' + id);
  }
}
