import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

export default function ComboBox({ data, generateRatingIcons }) {
  const [open, setOpen] = useState(false);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={data}
      clearOnBlur={false}
      sx={{ width: 450 }}
      getOptionLabel={(option) => option.label}
      open={open}
      onOpen={() => setOpen(true)}
      onChange={() => setOpen(false)}
      renderOption={(props, option) => {
        console.log("option", option);
        return (
          <Box component="li" {...props} className="options_box">
            <Box className="option_header">
              <h2 className="title">{option.label}</h2>
              <h3 className="category">{option.category}</h3>
            </Box>
            <Box className="Rating_box">
              <h4>{generateRatingIcons(option.rating)}</h4>
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Enter Movie Name" />
      )}
    />
  );
}

ComboBox.propTypes = {
  data: PropTypes.array.isRequired, // Define data prop as an array and mark it as required
  generateRatingIcons: PropTypes.func.isRequired, // Define generateRatingIcons prop as a function and mark it as required
};
