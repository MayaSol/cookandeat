import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DP = props => {
  const [startDate, setStartDate] = useState( new Date() );

  const changeDate = (date) => {
  	setStartDate(date);
  	props.onChangeDate(date);
  }

  return (
    <DatePicker selected={startDate} onChange={date => changeDate(date)} />
  );
};

export default DP;