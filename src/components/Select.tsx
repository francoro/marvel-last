import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
interface SelectProps<T> {
  options: T[];
  value?: T;
  onChange: (value: T) => void;
  getDisplayValue: (option: T) => string;
  label: string;
}

export function SelectComponent<T>({
  options,
  value,
  onChange,
  getDisplayValue,
  label,
}: SelectProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T | undefined>(value);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = options.find(
      (option) => getDisplayValue(option) === event.target.value
    );
    if (newValue !== undefined) {
      setSelectedValue(newValue);
      onChange(newValue);
    }
  };
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        size="medium"
        sx={{ width: "100px" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue ? getDisplayValue(selectedValue) : ""}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem value={getDisplayValue(option)}>
            {getDisplayValue(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
