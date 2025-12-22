import { useQuery } from "@tanstack/react-query";
import { BOOKING_API_BASE_URL } from "../settings/deskBookingAPI";
import type { Desk } from "../dataTypes/DeskTypes";
import { Navigate } from "react-router";
import { PATHS } from "./routes/paths";
import FullScreenLoader from "../components/shared/FullScreenLoader";
import { useState } from "react";
import DateRangePicker from "../components/desks/DateRangePicker";
import type { DateRange } from "../dataTypes/DateTypes";
import { toDateIsoOnly } from "../utils/date";
import DesksCalendar from "../components/desks/DesksCalendar";
import dayjs from "dayjs";

export default function HomePage() {
  const userId = localStorage.getItem("userId");
  const today = toDateIsoOnly(new Date());
  const afterWeek = toDateIsoOnly(dayjs().add(6, "day").toDate());

  const [dateRange, setDateRange] = useState<DateRange>({
    from: today,
    to: afterWeek,
  });

  const {
    isPending,
    isError,
    error,
    data: desks,
  } = useQuery<Desk[]>({
    queryKey: ["desks", dateRange.from, dateRange.to],
    queryFn: async () => {
      const res = await fetch(
        `${BOOKING_API_BASE_URL}/desks?from=${dateRange.from}&to=${dateRange.to}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch desks");
      }

      return res.json();
    },
    enabled: Boolean(dateRange.from && dateRange.to),
  });

  if (!userId) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  if (isError) {
    return <p className="text-red-500">{(error as Error).message}</p>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-7">Book your desk</h1>
      <DateRangePicker value={dateRange} onChange={setDateRange} />
      <FullScreenLoader open={isPending} />
      {desks && (
        <DesksCalendar
          dateRange={dateRange}
          currentUserId={Number(userId)}
          desks={desks}
        />
      )}
    </>
  );
}
