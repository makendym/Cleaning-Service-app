const { Book } = require('./models/Book');
const Bookings = require('./models/Bookings');
const resolvers = {
    Query: {
        hello: (_, {name}) => `Hello ${name}`,
        books: async () => await Book.find({}),
        bookings: async () => await Bookings.find({}),
    },
    Mutation: {
        create: async (_, {title, year}) => {
            const newBook = new Book(
                title, year
            );
            await newBook.save();
            return newBook;
        },
        delete: async (_, {id}) => {
            const result = await Book.deleteOne({_id: id});
            if(result.acknowledged && result.deletedCount === 1){
                return id;
            }
            return null;
        },
        edit: async (_, {id, title, year}) => {
            const result = await Book.updateOne(
                {
                    _id: id,
                },
                {
                    $set: {
                        title,
                        year
                    },
                });
            if (result.acknowledged && result.modifiedCount === 1) {
                return await Book.findOne({_id: id});
            }
            return null;
        },

        createBooking: async (_, { booking }) => {
            const newBooking = new Bookings(booking);
            await newBooking.save();
            return newBooking;
          },

    }
};
module.exports = resolvers;