import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function FullScreenLoader({ open }: { open: boolean }) {
  return (
    <Backdrop open={open} sx={{ color: "#fff", zIndex: 1300 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
