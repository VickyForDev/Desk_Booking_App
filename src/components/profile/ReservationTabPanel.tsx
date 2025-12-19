import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import type { UserReservation } from "../../dataTypes/ReservationTypes";
import { formatDate } from "../../utils/date";
import EventSeatTwoToneIcon from "@mui/icons-material/EventSeatTwoTone";

interface CustomTabPanelProps {
  reservations: UserReservation[];
  index: number;
  value: number;
}

export default function ReservationTabPanel({
  index,
  value,
  reservations,
}: CustomTabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
    >
      {value === index && (
        <>
          {reservations.length === 0 ? (
            <Typography color="text.secondary" sx={{ p: 3 }}>
              No reservations found.
            </Typography>
          ) : (
            <List sx={{ px: 2 }}>
              {reservations.map((r, i) => (
                <div key={r.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <ListItemIcon>
                      <EventSeatTwoToneIcon
                        color="primary"
                        sx={{ fontSize: "var(--small-icon)" }}
                      />
                    </ListItemIcon>

                    <ListItemText
                      primary={`Desk #${r.deskId}`}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {formatDate(r.startDate)} – {formatDate(r.endDate)}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>

                  {i < reservations.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          )}
        </>
      )}
    </div>
  );
}
