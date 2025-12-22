import type { User } from "./UserTypes";

export type UserReservation = {
  id: number;
  startDate: string;
  endDate: string;
  deskId: number;
};

export type DeskReservation = {
  id: number;
  startDate: string;
  endDate: string;
  user: User;
};
