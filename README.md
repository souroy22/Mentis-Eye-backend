---
title: My Project
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.22"

---

# My Project

Base URLs:

# Authentication

# Default

## POST Sign Up

POST /api/v1/auth/signup

> Body Parameters

```json
{
  "name": "Test",
  "username": "testing@gmail.com",
  "password": "password"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> 200 Response

```json
{
  "user": {
    "name": "string",
    "username": "string"
  },
  "token": "string"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» user|object|true|none||none|
|»» name|string|true|none||none|
|»» username|string|true|none||none|
|» token|string|true|none||none|

## GET Get Reccords

GET /api/v1/record/DATABASE_1

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|sortBy|query|string| no |none|
|sortOrder|query|string| no |none|
|searchValue|query|string| no |none|
|page|query|string| no |none|
|Authorization|header|string| no |none|

> Response Examples

> 200 Response

```json
{
  "records": [
    {
      "name": "string",
      "userEmail": "string",
      "userPhone": "string",
      "slug": "string"
    }
  ],
  "totalCount": 0
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» records|[object]|true|none||none|
|»» name|string|true|none||none|
|»» userEmail|string|true|none||none|
|»» userPhone|string|true|none||none|
|»» slug|string|true|none||none|
|» totalCount|integer|true|none||none|

## POST Sign IN

POST /api/v1/auth/signin

> Body Parameters

```json
{
  "username": "testing@gmail.com",
  "password": "password"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> 200 Response

```json
{
  "user": {
    "name": "string"
  },
  "token": "string"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» user|object|true|none||none|
|»» name|string|true|none||none|
|» token|string|true|none||none|

## POST Create Record

POST /api/v1/record/create

> Body Parameters

```json
{
  "name": "New Test",
  "userEmail": "userEmail@gmail.com",
  "userPhone": "8777644039",
  "database": "DATABASE_1"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|Authorization|header|string| no |none|
|body|body|object| no |none|

> Response Examples

> 400 Response

```json
{
  "error": "string",
  "missingFields": [
    "string"
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|Inline|

### Responses Data Schema

HTTP Status Code **400**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» error|string|true|none||none|
|» missingFields|[string]|true|none||none|

# Data Schema

