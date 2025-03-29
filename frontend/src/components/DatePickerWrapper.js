import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

/**
 * A wrapper component for DatePicker that handles compatibility between different versions
 * of the @mui/x-date-pickers library.
 */
const DatePickerWrapper = ({ label, value, onChange, ...props }) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      slotProps={{ textField: { fullWidth: true, ...props } }}
    />
  );
};

export default DatePickerWrapper;