import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '@interfaces/evento.interface';
import { DetalleEventoResponse } from '@interfaces/detalle-evento.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL = environment.urlAPI;
  }
  getEvents(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.URL + '/events');
  }

  getEventInfo(id: number): Observable<DetalleEventoResponse> {
    return this.http.get<DetalleEventoResponse>(this.URL + '/event_info_' + id);
  }
}
