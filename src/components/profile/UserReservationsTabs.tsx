import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import ReservationTabPanel from "./ReservationTabPanel";
import { useState } from "react";
import type { UserReservation } from "../../dataTypes/ReservationTypes";
import { toDateOnly } from "../../utils/date";

function a11yProps(index: number) {
  return {
    id: `custom-tab-${index}`,
    "aria-controls": `custom-tabpanel-${index}`,
  };
}

function splitReservationsByTime(reservations: UserReservation[]) {
  const today = toDateOnly(new Date());

  const activeReservations: UserReservation[] = [];
  const pastReservations: UserReservation[] = [];

  for (const reservation of reservations) {
    const endDate = toDateOnly(new Date(reservation.endDate));

    if (endDate >= today) {
      activeReservations.push(reservation);
    } else {
      pastReservations.push(reservation);
    }
  }

  activeReservations.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  pastReservations.sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  );

  return { activeReservations, pastReservations };
}

export default function UserReservationsTabs({
  reservations,
}: {
  reservations: UserReservation[];
}) {
  const [value, setValue] = useState(0);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { activeReservations, pastReservations } =
    splitReservationsByTime(reservations);

  const customTabStyles = {
    "& .MuiTab-root": {
      textTransform: "none",
      color: "var(--main-purple)",
      fontWeight: 600,
      fontSize: "1rem",
      letterSpacing: "0.03em",
    },
    "& .MuiTab-root.Mui-selected": {
      color: "var(--main-orange)",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "var(--main-orange)",
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="user reservations tabs"
          sx={customTabStyles}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label="Current desk reservations" {...a11yProps(0)} />
          <Tab label="Previous reservations" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <ReservationTabPanel
        value={value}
        index={0}
        reservations={activeReservations}
      />
      <ReservationTabPanel
        value={value}
        index={1}
        reservations={pastReservations}
      />
    </Box>
  );
}
