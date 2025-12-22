import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BOOKING_API_BASE_URL } from "../../settings/deskBookingAPI";
import FullScreenLoader from "../shared/FullScreenLoader";
import axios from "axios";

interface CancelationDialogProps {
  open: boolean;
  handleClose: () => void;
  reservationId: number;
  date: string;
  deskId: number;
}

export default function CancelationDialog({
  open,
  handleClose,
  reservationId,
  date,
  deskId,
}: CancelationDialogProps) {
  const [forThisDay, setForThisDay] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const {
    mutate: cancelReservation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const body = forThisDay ? { date } : {};

      try {
        const res = await axios.post(
          `${BOOKING_API_BASE_URL}/desks/${deskId}/reservations/${reservationId}/cancel`,
          body
        );
        return res.data;
      } catch (err: any) {
        const message = err.response?.data ?? "Failed to cancel reservation.";
        throw new Error(message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] });
      handleClose();
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    cancelReservation();
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 4 }}>
            Please choose how you want to cancel your reservation:
          </DialogContentText>
          {isError && <p style={{ color: "red" }}>{error.message}</p>}
          <FullScreenLoader open={isPending} />
          <form onSubmit={handleSubmit} id="cancelation-form">
            <RadioGroup
              value={forThisDay ? "true" : "false"}
              onChange={(e) => setForThisDay(e.target.value === "true")}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label={`Cancel only for ${date}`}
              />

              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Cancel entire reservation range"
              />
            </RadioGroup>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Exit</Button>
          <Button type="submit" form="cancelation-form">
            Cancel Reservation
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
