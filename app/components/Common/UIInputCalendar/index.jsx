import React, { useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";

function UIInutCalendar(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const { lable } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        disableFuture
        openTo="year"
        format="dd/MM/yyyy"
        label={lable}
        views={["year", "month", "date"]}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
}

export default UIInutCalendar;
