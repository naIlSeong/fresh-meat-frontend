import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import Cookies from "js-cookie";
import { createUploadLink } from "apollo-upload-client";

const sessionId = Cookies.get("connect.sid");
export const isLoggedInVar = makeVar(Boolean(sessionId));

const link = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.API_DOMAIN
      : "https://localhost:4000/graphql",
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
