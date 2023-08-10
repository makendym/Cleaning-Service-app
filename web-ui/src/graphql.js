import { gql } from '@apollo/client';

export const CREATE_BOOK_MUTATION = gql`
    mutation Mutation($title: String, $year: Int) {
        create(title: $title, year: $year) {
            id
            title
            year
        }
    }
`;
export const CREATE_BOOKING_MUTATION = gql`
mutation CreateBookingMutation($booking: BookingInput!) {
    createBooking(booking: $booking) {
      id
      createdAt
      updatedAt
      first_name
      last_name
      phone_number
      email
      address
      state
      city
      zip
      package
      bedrooms
      bathrooms
      kitchen
      dining_room
      supplies
      kindOfPet
      add_ons
      notes
      booking_date
      booking_time
    }
  }

`;

export const BOOKS_QUERY = gql`
    query Books {
        books {
            title
            year
            id
        }
    }
`;

export const BOOKINGS_QUERY = gql`
    query Bookings {
        bookings {
            id
            createdAt
            updatedAt
            first_name
            last_name
            phone_number
            email
            address
            state
            city
            zip
            package
            bedrooms
            bathrooms
            kitchen
            dining_room
            supplies
            kindOfPet
            add_ons
            notes
            booking_date: GraphQLDateTime
            booking_time
        }

    }
`;
export const DELETE_BOOK_MUTATION = gql`
    mutation Mutation($id: ID) {
        delete(id: $id)
    }
`;

export const EDIT_BOOK_MUTATION = gql`
    mutation Mutation($id: ID, $title: String, $year: Int) {
        edit(id: $id, title: $title, year: $year) {
            id
            title
            year
        }
    }
`;