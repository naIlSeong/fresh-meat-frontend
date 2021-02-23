# Fresh Meat Frontend

**Backend git repository &rarr;** https://github.com/naIlSeong/fresh-meat-backend

---

## Todo

- [x] Header
- [x] Footer
- [ ] Navigation?
      </br>

**Logged out**

- [x] Sign up **(/signup)**
- [x] Login **(/login)**
      </br>

**Logged in**

- **Home**

  - [x] Add Image
  - [x] Create Bidding
  - [x] Update Bidding
  - [x] VIEW Button
  - [x] Upload Product Button

  - [ ] Debug : Input value validate

- **User**

  - [x] Update User **(/edit-account)**
  - [x] Delete User **(/user/withdrawal)**
  - [x] Logout
  - [x] User Detail **(/user/:username)**
  - [x] My Profile **(/my-profile)**

- **Product**

  - [ ] Upload Product **(/product/new)**
  - [ ] Upload Image
  - [x] Product Detail **(/product/:id)**
  - [x] Edit Progress
  - [x] Delete Product **(/product/:id/delete)**
  - [ ] Edit Product **(/product/:id/update)**

---

---

## Memo

`js-cookie` &larr; Using cookie

#### **Issue #1**

Can't save cookie received from backend

**Solution**

1. `http` &rarr; `https` (Frontend & Backend)
2. Cookie options &rarr; `same-site: none; secure;`

---

#### **Issue #2**

After changing backend from http to https

```
$ apollo client:codegen src/__generated__ --target=typescript --outputFlat

Error: FetchError: request to https://localhost:4000/graphql failed, reason: unable to verify the first certificate
```

**Solution**

1. apollo version `v2.32.1` &rarr; `v2.31.2`
2. Update `apollo.config.js`

```
module.exports = {
  client: {
    ...
    service: {
      name: "fresh-meat-backend",
      url: "https://localhost:4000/graphql",
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};

```

Docs: https://www.apollographql.com/docs/devtools/apollo-config/

---

#### **Issue #3**

Can not open object url loaded from AWS S3

**Solution**

1. Update the bucket policy like:

```
{
    "Version": "2012-10-17",
    "Id": "Policy1613754235370",
    "Statement": [
        {
            "Sid": "Stmt1613754220694",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<YOUR_BUCKET_NAME>/*"
        }
    ]
}
```

---

#### **Issue #4**

Cache remains in Apollo Client after logout

**Solution**

1. Update logout logic in `use-logout.tsx` like:

```
...
if (ok) {
      isLoggedInVar(false);
      history.push("/");
      Cookies.remove("connect.sid");
      client.clearStore();
    }
```

2. `clearStore()` vs`resetStore()`

`resetStore()`will remove all data from the store and then re-executing all of active queries.
In my case, `resetStore()`will refetch `meQuery`. Since `meQuery` is not a public query, API Server returns `403 Forbidden` error.
But `clearStore()`will not refetch any active queries after clearing out cache.

Docs: https://www.apollographql.com/docs/react/api/core/ApolloClient/
https://www.apollographql.com/docs/react/api/core/ApolloClient/#functions
