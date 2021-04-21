const { ApolloClient,InMemoryCache, gql, HttpLink } = require('@apollo/client');
const fetch = require('cross-fetch');


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'http://localhost:4001', fetch}),
});

client
  .query({
    query: gql`
      query Users {
        users {
          _id,
          picture,
        }
      }
    `
  })
  .then(result => console.log(result.data));




  // {"query":"
  //     { users {
  //       _id,
  //       picture
  //      }
  //     }"
  //   }
