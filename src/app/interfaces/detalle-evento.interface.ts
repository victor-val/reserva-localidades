export interface DetalleEvento {
  title: string;
  sessions: Session[];
}
export interface Session {
  date: string;
  availability: number;
}
export interface DetalleEventoResponse {
  event: { title: string };
  sessions: Session[];
}
