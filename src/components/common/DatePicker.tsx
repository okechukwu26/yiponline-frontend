import DatePicker from "react-datepicker";
interface Props {
  value: Date;
  handleDate: (date: Date) => void;
  minDate: Date;
  maxDate: Date;
  style: string;
}

const DatePickers = ({ value, handleDate, minDate, maxDate, style }: Props) => {
  return (
    <DatePicker
      className={style}
      selected={value}
      onChange={(date) => {
        if (date) {
          handleDate(date);
        }
      }}
      minDate={minDate}
      maxDate={maxDate}
      dateFormat="dd/MM/yyyy"
    />
  );
};

export default DatePickers;
