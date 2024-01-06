import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Dropdown = ({ data, label, selectedValue, handleChange }) => {
  // const [open, setOpen] = useState(false);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={selectedValue}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          multiple // Allow multiple selections
        >
          {/* Display items based on the type of data */}
          {data.map((item, index) =>
            typeof item === "string" ? (
              <MenuItem key={index} value={item}>
                <Checkbox checked={selectedValue.includes(item)} />
                {item}
              </MenuItem>
            ) : (
              <MenuItem key={item.rating} value={item.rating}>
                <Checkbox checked={selectedValue.includes(item.rating)} />
                {item.icons.map((icon, iconIndex) => (
                  <React.Fragment key={iconIndex}>{icon}</React.Fragment>
                ))}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </div>
  );
};

Dropdown.propTypes = {
  data: PropTypes.array.isRequired, // Define data prop as an array and mark it as required
  label: PropTypes.string.isRequired,
  selectedValue: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  // Add PropTypes for other props if needed
};

export default Dropdown;
