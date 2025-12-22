import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import DateRangePicker from "./DateRangePicker";
import type { DateRange } from "../../dataTypes/DateTypes";
import { toDateIsoOnly } from "../../utils/date";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ActiveReservation } from "../../dataTypes/ReservationTypes";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { api } from "../../api/deskBookingAPI";
import FullScreenLoader from "../shared/FullScreenLoader";
import { extractErrorMessage } from "../../utils/errors";
import {
  reservationSchema,
  type ReservationBody,
} from "../../api/schemes/reservationValidators";

interface ReservationDialogProps {
  open: boolean;
  handleClose: () => void;
  deskId: number;
  date: string;
}

export default function ReservationDialog({
  open,
  handleClose,
  deskId,
  date,
}: ReservationDialogProps) {
  const defaultDate = toDateIsoOnly(new Date(date));
  const userId = localStorage.getItem("userId");

  const [dateRange, setDateRange] = useState<DateRange>({
    from: defaultDate,
    to: defaultDate,
  });

  const queryClient = useQueryClient();

  const { data: activeReservations } = useQuery({
    queryKey: ["desk-reservations", deskId],
    queryFn: async () => {
      const res = await api.get<ActiveReservation[]>(
        `/desks/${deskId}/reservations`
      );
      return res.data;
    },
    enabled: open,
  });

  function isDateDisabled(day: Dayjs) {
    if (!activeReservations) return false;

    return activeReservations.some((r) => {
      const start = dayjs(r.startDate);
      const end = dayjs(r.endDate);

      return (
        day.isAfter(start.subtract(1, "day")) && day.isBefore(end.add(1, "day"))
      );
    });
  }

  const {
    mutate: createReservation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const body: ReservationBody = {
        startDate: dateRange.from,
        endDate: dateRange.to,
        userId: Number(userId),
      };

      const parsed = reservationSchema.safeParse(body);

      if (!parsed.success) {
        const message = parsed.error.issues[0].message;
        throw new Error(message);
      }

      try {
        const res = await api.post(`/desks/${deskId}/reservations/`, body);
        return res.data;
      } catch (err: any) {
        throw new Error(extractErrorMessage(err));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] });
      handleClose();
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createReservation();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: 4 }}>
          {`Please choose your reservation date range for desk #${deskId}`}
        </DialogContentText>
        {isError && (
          <p style={{ color: "red", marginBottom: 10 }}>{error.message}</p>
        )}
        <FullScreenLoader open={isPending} />
        <form onSubmit={handleSubmit} id="reservation-form">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            disabled={isDateDisabled}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="reservation-form">
          Reserve
        </Button>
      </DialogActions>
    </Dialog>
  );
}
