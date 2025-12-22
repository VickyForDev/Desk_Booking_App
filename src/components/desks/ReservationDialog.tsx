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

interface ReservationDialogProps {
  open: boolean;
  handleClose: () => void;
  deskId: number;
}

export default function ReservationDialog({
  open,
  handleClose,
  deskId,
}: ReservationDialogProps) {
  const today = toDateIsoOnly(new Date());

  const [dateRange, setDateRange] = useState<DateRange>({
    from: today,
    to: today,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: 4 }}>
          {`Please choose your reservation date range for desk #${deskId}`}
        </DialogContentText>
        <form onSubmit={handleSubmit} id="reservation-form">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
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
