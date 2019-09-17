const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Booking {
    _id: ID!
    song: Song!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type User {
    _id: ID!
    name: String!
    password: String
    email: String!
    tel: String!
    songsList: [Song!]
}

type Song {
    _id: ID!
    name: String!
    singer: String!
    category: String!
    userList: User!
}

input UserInput {
    name: String!
    password: String!
    email: String!
    tel: String!
}

input SongInput {
    name: String!
    singer: String!
    category: String!
}

type rootQuery {
    users: [User!]!
    bookings: [Booking!]!
}

type rootMutation {
    createUser(userInput: UserInput): User
    createSong(songInput: SongInput): Song
    bookEvent(songId: ID!): Booking!
    cancelBooking(bookingId: ID!): Song!
}

schema {
    query: rootQuery
    mutation: rootMutation
}
`)