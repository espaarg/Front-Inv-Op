import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerComponentProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        showMonthYearPicker
        dateFormat="yyyy/MM/01"
        className="form-control"
      />
    </div>
  );
};

export default DatePickerComponent;