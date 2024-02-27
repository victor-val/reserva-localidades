export interface CartElement {
  id: number;
  title: string;
  sessions: SessionSelected[];
}
export interface SessionSelected {
  dateSession: number;
  seatsSelected: number;
}
