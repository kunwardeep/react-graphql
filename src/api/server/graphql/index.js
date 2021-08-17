const { ApolloServer, gql, UserInputError } = require("apollo-server");
var data = require("../rest/data.json");
const axios = require("axios");

// 1
const typeDefs = gql`
  type Name {
    first: String
    last: String
  }
  type friend {
    id: String
    name: String
  }

  type User {
    _id: String
    isActive: String
    balance: String
    picture: String
    name: Name
    friends: [friend]
  }

  input NameInput {
    first: String!
    last: String!
  }

  input UserInput {
    name: NameInput!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "users" query returns an array of zero or more Books (defined above).
  type Query {
    users(id: String): [User]
  }

  type Mutation {
    createUser(input: UserInput): User
  }
`;

class Name {
  constructor(firstName, lastName) {
    this.first = firstName;
    this.last = lastName;
  }
}
class User {
  constructor(id, firstName, lastName) {
    this._id = id;
    this.name = new Name(firstName, lastName);
  }
}

// 2
const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      data = getData();
      console.log("ID", args.id);

      if (typeof args.id !== "undefined") {
        x = data.then((results) => {
          return results.filter((result) => result._id === args.id);
        });
        console.log("x---", x);
        return x;
      } else {
        return data;
      }
    },
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      var id = require("crypto").randomBytes(10).toString("hex");
      console.log(args.input.name.first);
      console.log(args.input.name.last);

      return new User(id, args.input.name.first, args.input.name.last);
      // return new Message(id, input);
    },
  },
};

const getData = () => {
  return axios
    .get("http://localhost:3001")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
// 3
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen({
    port: 4001,
  })
  .then(({ url }) => console.log(`Server is running on ${url}`));
