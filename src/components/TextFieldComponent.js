import { TextField } from "@mui/material";
export default function TextFieldComponent({
  id,
  label,
  valueGetter,
  valueSetter,
  size,
}) {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      onChange={(e) => valueSetter(e.target.value)}
      value={valueGetter}
      size={size}
      className="bg-white"
    />
  );
}
