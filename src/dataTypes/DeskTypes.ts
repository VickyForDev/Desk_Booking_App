import type { DeskReservation } from "./ReservationTypes";

export type Desk = {
  id: number;
  state: DeskState;
  reservations: DeskReservation[];
};

export const DeskState = {
  Open: 0,
  Maintenance: 1,
} as const;

export type DeskState = (typeof DeskState)[keyof typeof DeskState];
