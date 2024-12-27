import { Dropdown } from "react-bootstrap";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

export const FilterDropdown = ({
  label,
  options,
  selected,
  onChange,
}: FilterDropdownProps) => {
  return (
    <div>
      <label>{label}</label>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selected || "Select an option"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((option) => (
            <Dropdown.Item key={option} onClick={() => onChange(option)}>
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
