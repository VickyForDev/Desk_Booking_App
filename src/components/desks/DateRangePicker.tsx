import { Box } from "@mui/material";
import type { DateRange } from "../../dataTypes/DateTypes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

type DateRangePickerProps = {
  value: DateRange;
  onChange: (value: DateRange) => void;
  disabled?: (day: Dayjs) => boolean;
};

export default function DateRangePicker({
  value,
  onChange,
  disabled,
}: DateRangePickerProps) {
  const fromValue = dayjs(value.from);
  const toValue = dayjs(value.to);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <DatePicker
          label="From"
          value={fromValue}
          format="YYYY-MM-DD"
          shouldDisableDate={disabled}
          onChange={(newValue) => {
            onChange({
              from: newValue?.format("YYYY-MM-DD"),
              to:
                value.to && newValue && dayjs(value.to).isBefore(newValue)
                  ? newValue.format("YYYY-MM-DD")
                  : value.to,
            });
          }}
        />

        <DatePicker
          label="To"
          value={toValue}
          format="YYYY-MM-DD"
          minDate={fromValue ?? undefined}
          shouldDisableDate={disabled}
          onChange={(newValue) =>
            onChange({
              ...value,
              to: newValue?.format("YYYY-MM-DD"),
            })
          }
        />
      </Box>
    </LocalizationProvider>
  );
}
