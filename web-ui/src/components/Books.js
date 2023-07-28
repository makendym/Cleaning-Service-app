import { gql, useQuery } from '@apollo/client';
import Book from './Book';
import { BOOKS_QUERY, BOOKINGS_QUERY } from '../graphql';

export default function Books() {
  const { data, error, loading } = useQuery(BOOKS_QUERY);
  const { data: bookingsData, error: bookingsError, loading: bookingsLoading } = useQuery(BOOKINGS_QUERY);

  if (error) {
    console.error('BOOKS_QUERY error', error);
  }

  if (bookingsError) {
    console.error('BOOKINGS_QUERY error', bookingsError);
  }

  return (
    <div>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td>Loading...</td></tr>}
          {error && <tr><td>Check console for error logs</td></tr>}
          {!loading && !error && data?.books.map(book => <Book book={book} key={book.id} />)}
        </tbody>
      </table>

      {/* Print the response of BOOKINGS_QUERY */}
      {bookingsLoading && <div>Loading Bookings...</div>}
      {bookingsError && <div>Error fetching bookings: {bookingsError.message}</div>}
      {!bookingsLoading && !bookingsError && (
        <div>
          {bookingsData?.bookings.map(booking => (
            <div key={booking.id}>
              <p>Booking ID: {booking.id}</p>
              <p>First Name: {booking.first_name}</p>
              <p>Last Name: {booking.last_name}</p>
              <p>Phone Number: {booking.phone_number}</p>
              <p>Email: {booking.email}</p>
              <p>Address: {booking.address}</p>
              <p>State: {booking.state}</p>
              <p>City: {booking.city}</p>
              <p>ZIP: {booking.zip}</p>
              <p>Package: {booking.package}</p>
              <p>Bedrooms: {booking.bedrooms}</p>
              <p>Bathrooms: {booking.bathrooms}</p>
              <p>Kitchen: {booking.kitchen}</p>
              <p>Dining Room: {booking.dining_room}</p>
              <p>Supplies: {booking.supplies}</p>
              <p>Kind of Pet: {booking.kindOfPet}</p>
              <p>Add-ons: {booking.add_ons}</p>
              <p>Notes: {booking.notes}</p>
              <p>Booking Date: {booking.booking_date}</p>            </div>
          ))}
        </div>
      )}
    </div>
  );
}
