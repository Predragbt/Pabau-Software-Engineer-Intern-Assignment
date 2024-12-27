import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div>
      <label>{t(label)}</label>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {t(selected.toLowerCase(), { defaultValue: selected }) || t(label)}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((option) => (
            <Dropdown.Item
              key={option}
              onClick={() => onChange(option)}
            >
              {t(option.toLowerCase(), { defaultValue: option })}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
