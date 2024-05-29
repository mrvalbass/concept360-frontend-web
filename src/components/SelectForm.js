import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
} from "@mui/material";

export default function SelectForm({
  id,
  label,
  multiple,
  valueGetter,
  valueSetter,
  valueList,
  size,
}) {
  return !multiple ? (
    <FormControl fullWidth>
      <InputLabel id={`${id}`}>{label}</InputLabel>
      <Select
        labelId={`${id}`}
        id={`select_${id}`}
        value={valueGetter}
        label={`${id}`}
        onChange={(e) => valueSetter(e.target.value)}
        size={size}
      >
        {valueList.map((element) => (
          <MenuItem key={element} value={element}>
            {element}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <FormControl fullWidth>
      <InputLabel id={`${id}`}>{label}</InputLabel>
      <Select
        labelId={`${id}`}
        id={`select_${id}`}
        multiple
        value={valueGetter}
        label={`${id}`}
        size={size}
        onChange={(event) => {
          const {
            target: { value },
          } = event;
          valueSetter(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
          );
        }}
        renderValue={(selected) => selected.join(", ")}
      >
        {valueList.map((element) => (
          <MenuItem key={element} value={element}>
            <Checkbox checked={valueGetter.indexOf(element) > -1} />
            <ListItemText primary={element} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
