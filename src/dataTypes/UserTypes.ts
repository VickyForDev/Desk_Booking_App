import type { UserReservation } from "./ReservationTypes"

export type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export type FullUser = {
  id: number;
  firstName: string;
  lastName: string;
  reservations: UserReservation[]
};


