import { useState } from "react";

interface SelectProps<T> {
  options: T[];
  value?: T;
  onChange: (value: T) => void;
  getDisplayValue: (option: T) => string;
}

export function Select<T>({
  options,
  value,
  onChange,
  getDisplayValue,
}: SelectProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T | undefined>(value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = options.find(
      (option) => getDisplayValue(option) === event.target.value
    );
    if (newValue !== undefined) {
      setSelectedValue(newValue);
      onChange(newValue);
    }
  };
  return (
    <select
      value={selectedValue ? getDisplayValue(selectedValue) : ""}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={getDisplayValue(option)} value={getDisplayValue(option)}>
          {getDisplayValue(option)}
        </option>
      ))}
    </select>
  );
}
