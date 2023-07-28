import React, { useEffect, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import { Typography } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BOOKINGS_QUERY } from '../graphql';

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function Schedule() {
  const [calEvents, setCalEvents] = useState([]);

  const { data, error: bookingsError, loading: bookingsLoading } = useQuery(BOOKINGS_QUERY);

  useEffect(() => {
    if (data && !bookingsLoading && !bookingsError) {
      const appointments = data.bookings.map(booking => ({
        ...booking,
        start: moment.utc(booking.booking_date).toDate(),
        end: moment.utc(booking.booking_date).toDate(),
      }));
      setCalEvents(appointments);
    }
  }, [data, bookingsLoading, bookingsError]);

  if (bookingsLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (bookingsError) {
    return <Typography>Error: {bookingsError.message}</Typography>;
  }

  return (
    <Calendar
      localizer={localizer}
      events={calEvents}
      startAccessor="start"
      endAccessor="end"
    />
  );
}
