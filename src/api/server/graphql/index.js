const { ApolloServer, gql } = require("apollo-server");
var data = require('../rest/data.json');
const axios = require('axios');

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
    balance:String
    picture:String
    name: Name
    friends: [friend]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "users" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
  }
`;

// 2
const resolvers = {
  Query: {
    users:() => {
     return axios.get('http://localhost:3001')
        .then(response => {
                return response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};

// 3
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({
  port: 4001,
}).then(({ url }) => console.log(`Server is running on ${url}`));
