import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import Cookies from "js-cookie";

const sessionId = Cookies.get("connect.sid");
export const isLoggedInVar = makeVar(Boolean(sessionId));

const link = createHttpLink({
  uri: "https://localhost:4000/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
        },
      },
    },
  }),
});
