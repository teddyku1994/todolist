const uuid = require('uuid/v4')

export default io => ({
  create: async data => {
    if (!data.message || !data.message.trim() || !data.deadline || !data.deadline.trim()) return {
      statusCode: 400,
      error: "Invalid input format"
    }
    const res = await io.db.post({
      id: uuid(),
      message: data.message,
      createdAt: new Date().toISOString(),
      deadline: data.deadline
    })
    return res
  },

  fullList: async () => {
    const res = await io.db.getAll()
    if (res.length === 0) return { error: 'No Result' }
    return res
  },

  listSingle: async data => {
    const { id } = data.pathParameters
    const res = await io.db.getSingle({
      id: id
    })
    if (!res.Item.id) return { error: 'No Result' }
    return res
  },

  updateSingle: async event => {
    const data = io.handler.input(event)
    const { id } = event.pathParameters
    const newMessage = data.message
    const newdeadline = data.deadline
    if (!id || !newMessage && !newdeadline) return {
      statusCode: 400,
      error: 'Invalid input format'
    }
    const info = {}
    let expression
    if (newMessage) {
      info[':m'] = newMessage
      expression = "set message = :m"
    }
    if (newdeadline) {
      info[':d'] = newdeadline
      expression = "set message = :d"
    }
    if (newMessage && newdeadline) {
      expression = "set message = :m, deadline = :d"
    }
    const res = await io.db.updateSingle({
      id: id
    }, info, expression)
    return res
  },

  clearAll: async () => {
    const list = await io.db.getAll()
    let ids = list.map(item => item.id)
    for (let i = 0; i < ids.length; i++) {
      let res = await io.db.deleteAll({ id: ids[i] })
      if (res.error) return {
        statusCode: 500,
        error: "Delete Failed"
      }
    }
    return { status: "Successfully cleared" }
  }
})