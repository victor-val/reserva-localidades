export interface DetalleEvento {
  id: number;
  title: string;
  sessions: Session[];
}
export interface Session {
  date: number;
  availability: number;
}
export interface DetalleEventoResponse {
  event: { id: number; title: string };
  sessions: Session[];
}
