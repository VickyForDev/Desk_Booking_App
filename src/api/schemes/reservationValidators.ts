import { z } from "zod";
import dayjs from "dayjs";

export const reservationSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    userId: z.number().positive(),
  })
  .refine((data) => dayjs(data.startDate).isValid(), {
    message: "Start date is invalid",
    path: ["startDate"],
  })
  .refine((data) => dayjs(data.endDate).isValid(), {
    message: "End date is invalid",
    path: ["endDate"],
  })
  .refine((data) => !dayjs(data.startDate).isBefore(dayjs().startOf("day")), {
    message: "Start date cannot be in the past",
    path: ["startDate"],
  })
  .refine((data) => !dayjs(data.endDate).isBefore(dayjs().startOf("day")), {
    message: "End date cannot be in the past",
    path: ["endDate"],
  })
  .refine((data) => !dayjs(data.startDate).isAfter(dayjs(data.endDate)), {
    message: "Start date cannot be after end date",
    path: ["startDate"],
  })
  .refine((data) => !dayjs(data.endDate).isBefore(dayjs(data.startDate)), {
    message: "End date cannot be before start date",
    path: ["endDate"],
  });

export type ReservationBody = z.infer<typeof reservationSchema>;
