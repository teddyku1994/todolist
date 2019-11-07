const aws = require('aws-sdk')
const db = new aws.DynamoDB.DocumentClient({ region: 'us-east-2' })

const table = process.env.POSTS_TABLE

function sortByDate(a, b) {
  if (a.createdAt > b.createdAt) return -1
  else return 1
}

export const dynamo = {
  post: async data => {
    try {
      const params = {
        TableName: table,
        Item: data
      }
      await db.put(params).promise()
      return { status: "Input Successful" }
    } catch (err) {
      return err
    }
  },

  getAll: async () => {
    try {
      const params = {
        TableName: table,
      }
      const res = await db.scan(params).promise()
      return res.Items.sort((sortByDate))
    } catch (err) { 
      return err
    }
  },

  getSingle: async keys => {
    try {
      const params = {
        TableName: table,
        Key: keys
      }
      const res = await db.get(params).promise()
      return res
    } catch (err) {
      return err
    }
  },

  updateSingle: async (keys, data, expression) => {
    try {
      const params = {
        TableName: table,
        Key: keys,
        UpdateExpression: expression,
        ExpressionAttributeValues: data,
        ReturnValues: "ALL_NEW"
      }
      const res = await db.update(params).promise()
      return res
    } catch (err) {
      return err
    }
  },

  deleteAll: async keys => {
    try {
      const params = {
        TableName: table,
        Key: keys
      }
      const res = await db.delete(params).promise()
      return res
    } catch (err) {
      return err
    }
  }
}

export const handler = {
  input: data => JSON.parse(data.body),
  response: (code, result) => ({
    statusCode: code,
    body: JSON.stringify(result, null, 2)
  })
}

export default {
  handler: handler,
  db: dynamo
}