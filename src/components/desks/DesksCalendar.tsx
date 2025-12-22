import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { DeskState, type Desk } from "../../dataTypes/DeskTypes";
import { formatDate } from "../../utils/date";
import { useState } from "react";
import ReservationDialog from "./ReservationDialog";
import CancelationDialog from "./CancelationDialog";

function getDatesInRange(from: string, to: string) {
  const start = dayjs(from);
  const end = dayjs(to);
  const dates: string[] = [];
  let current = start;

  while (current.isBefore(end) || current.isSame(end)) {
    dates.push(current.format("YYYY-MM-DD"));
    current = current.add(1, "day");
  }
  return dates;
}

function getDeskStatus(desk: Desk, date: string, currentUserId: number) {
  if (desk.state === DeskState.Maintenance) {
    return { status: "maintenance" };
  }

  for (const r of desk.reservations) {
    const d = dayjs(date);
    const start = dayjs(r.startDate);
    const end = dayjs(r.endDate);

    const inRange =
      d.isSame(start) || d.isSame(end) || (d.isAfter(start) && d.isBefore(end));

    if (inRange) {
      return {
        status: r.user.id === currentUserId ? "mine" : "reserved",
        reservation: r,
      };
    }
  }

  return { status: "open" };
}

function isInThePast(date: string) {
  const today = dayjs().startOf("day");
  const d = dayjs(date);
  return d.isBefore(today);
}

const stickyHeader = {
  position: "sticky",
  fontWeight: "bold",
  color: "white",
  textAlign: "center",
};

const topStickyHeader = {
  backgroundColor: "var(--main-orange)",
};

const leftStickyHeader = {
  backgroundColor: "var(--main-purple)",
  width: 90,
  minWidth: 90,
  left: 0,
};

const colors = {
  open: "white",
  reserved: "#e36448",
  mine: "#f4f58c",
  maintenance: "#c1bfbf",
};

interface DesksCalendarProps {
  desks: Desk[];
  currentUserId: number;
  dateRange: { from: string; to: string };
}

export default function DesksCalendar({
  desks,
  dateRange,
  currentUserId,
}: DesksCalendarProps) {
  const dates = getDatesInRange(dateRange.from, dateRange.to);
  const [openReservationModal, setOpenReservationModal] = useState(false);
  const [deskToReserve, setDeskToReserve] = useState<{
    date: string | null;
    deskId: number | null;
  }>({
    date: null,
    deskId: null,
  });
  const [openCancelationModal, setOpenCancelationModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState<{
    reservationId: number | null;
    date: string | null;
    deskId: number | null;
  }>({
    reservationId: null,
    date: null,
    deskId: null,
  });

  function handleOpenReservationModal(deskId: number, date: string) {
    setDeskToReserve({ deskId: deskId, date: date });
    setOpenReservationModal(true);
  }

  function handleCloseReservationModal() {
    setDeskToReserve({ deskId: null, date: null });
    setOpenReservationModal(false);
  }

  function handleOpenCancelationModal(
    reservationId: number,
    date: string,
    deskId: number
  ) {
    setReservationToCancel({
      reservationId: reservationId,
      date: date,
      deskId: deskId,
    });
    setOpenCancelationModal(true);
  }

  function handleCloseCancelationModal() {
    setReservationToCancel({
      reservationId: null,
      date: null,
      deskId: null,
    });
    setOpenCancelationModal(false);
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 600,
          overflow: "auto",
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        }}
      >
        <Table
          stickyHeader
          sx={{
            "& .MuiTableCell-root": {
              borderBottom: "2px solid #d0d0d0",
            },
            "& .MuiTableCell-root:not(:last-child)": {
              borderRight: "1px solid #b0b0b057",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={[
                  stickyHeader,
                  leftStickyHeader,
                  {
                    zIndex: 3,
                  },
                ]}
              >
                Desk #
              </TableCell>
              {dates.map((date) => (
                <TableCell key={date} sx={[stickyHeader, topStickyHeader]}>
                  {formatDate(date)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {desks.map((desk) => (
              <TableRow key={desk.id}>
                <TableCell
                  sx={[
                    stickyHeader,
                    leftStickyHeader,
                    {
                      zIndex: 2,
                    },
                  ]}
                >
                  {desk.id}
                </TableCell>

                {dates.map((date) => {
                  const { status, reservation } = getDeskStatus(
                    desk,
                    date,
                    currentUserId
                  );

                  const bg =
                    status === "open"
                      ? colors.open
                      : status === "reserved"
                      ? colors.reserved
                      : status === "mine"
                      ? colors.mine
                      : colors.maintenance;

                  const isCentered = status === "open" || status === "mine";

                  return (
                    <TableCell
                      key={date}
                      sx={{
                        backgroundColor: bg,
                        padding: 1,
                        verticalAlign: isCentered ? "middle" : "top",
                        textAlign: isCentered ? "center" : "left",
                        minWidth: 120,
                      }}
                    >
                      {status === "reserved" && reservation && (
                        <Tooltip
                          title={`${reservation.user.firstName} ${reservation.user.lastName}`}
                        >
                          <span className="text-xs text-white">Reserved</span>
                        </Tooltip>
                      )}

                      {status === "open" && (
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: "0.7rem",
                            backgroundColor: "#5fe95f",
                            color: "white",
                            border: "none",
                            "&:hover": { backgroundColor: "green" },
                          }}
                          disabled={isInThePast(date)}
                          onClick={() =>
                            handleOpenReservationModal(desk.id, date)
                          }
                        >
                          Reserve
                        </Button>
                      )}

                      {status === "mine" && reservation && (
                        <Button
                          size="small"
                          color="error"
                          sx={{ fontSize: "0.7rem" }}
                          disabled={isInThePast(date)}
                          onClick={() =>
                            handleOpenCancelationModal(
                              reservation.id,
                              date,
                              desk.id
                            )
                          }
                        >
                          Cancel
                        </Button>
                      )}

                      {status === "maintenance" && (
                        <Tooltip title="This desk is currently under maintenance. Sorry for the inconvenience.">
                          <span className="text-xs text-white">Disabled</span>
                        </Tooltip>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openReservationModal && deskToReserve.date && deskToReserve.deskId && (
        <ReservationDialog
          open={openReservationModal}
          handleClose={handleCloseReservationModal}
          deskId={deskToReserve.deskId}
          date={deskToReserve.date}
        />
      )}
      {openCancelationModal &&
        reservationToCancel.reservationId &&
        reservationToCancel.date &&
        reservationToCancel.deskId && (
          <CancelationDialog
            open={openCancelationModal}
            handleClose={handleCloseCancelationModal}
            reservationId={reservationToCancel.reservationId}
            date={reservationToCancel.date}
            deskId={reservationToCancel.deskId}
          />
        )}
    </>
  );
}
