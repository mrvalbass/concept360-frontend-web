import { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordComponent({
  id,
  label,
  valueGetter,
  valueSetter,
  size,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl variant="outlined" className="bg-white" size={size}>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id={`outlined-adornment-${id}`}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((show) => !show)}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="password"
        onChange={(e) => valueSetter(e.target.value)}
        value={valueGetter}
      />
    </FormControl>
  );
}
