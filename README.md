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
  - [ ] Delete User **(/user/withdrawal)**
  - [x] Logout
  - [ ] User Detail **(/user/:username)**

- **Product**

  - [ ] Upload Product **(/product/new)**
  - [ ] Upload Image
  - [ ] Product Detail **(/product/:id)**
  - [ ] Delete Product **(/product/:id/delete)**
  - [ ] Edit Product **(/product/:id/update)**

  - [ ] Edit Progress?

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
