import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerComponentProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DatePickerComponent2: React.FC<DatePickerComponentProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        showYearPicker
        dateFormat="yyyy"
        className="form-control"
      />
    </div>
  );
};

export default DatePickerComponent2;