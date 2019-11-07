# To Do List (Serverless Framework)

## APIs

### POST

* Create To Do Itineraries

https://2av3775gs5.execute-api.us-east-2.amazonaws.com/dev/todos

```javascript=
{
  "message": "找工作"
  "deadline": "2019-12-31"
}
```

### GET

* Get All Itineraries

https://2av3775gs5.execute-api.us-east-2.amazonaws.com/dev/todos

```javascript=
[
  {
    "deadline": "2019-11-31",
    "createdAt": "2019-11-07T13:40:33.310Z",
    "message": "Test",
    "id": "50105907-f978-4f31-b6d6-14aa6cb52cf2"
  },
  {
    "deadline": "2019-12-31",
    "createdAt": "2019-11-07T13:37:18.339Z",
    "message": "找工作",
    "id": "a223e1ca-95e8-4cfc-869d-6e618e8d406a"
  }
]
```

* Get By Id

https://2av3775gs5.execute-api.us-east-2.amazonaws.com/dev/todos/{id}

```javascript=
{
  "Item": {
    "deadline": "2019-12-31",
    "createdAt": "2019-11-07T13:37:18.339Z",
    "message": "找工作",
    "id": "a223e1ca-95e8-4cfc-869d-6e618e8d406a"
  }
}
```
### PUT

* Update Itineraries

https://2av3775gs5.execute-api.us-east-2.amazonaws.com/dev/todos/{id}

```javascript=
{
  "message": "找很多很多的工作"
  "deadline": "2019-11-31"
}
```

### DELETE

* Clears All Itineraries

https://2av3775gs5.execute-api.us-east-2.amazonaws.com/dev/todos

```javascript=
{
  "status": "Successfully cleared"
}
```